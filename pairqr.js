const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  Browsers,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  jidNormalizedUser
} = require("@whiskeysockets/baileys");
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');
const QRCode = require('qrcode');

// Per-session QR tracking (sessionId → base64 QR data URL)
const qrSessions = new Map();

function getQRData(sessionId) {
  if (sessionId) return qrSessions.get(sessionId) || null;
  // Fallback: return the most recent QR if no sessionId given
  const entries = [...qrSessions.entries()];
  return entries.length > 0 ? entries[entries.length - 1][1] : null;
}

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const curPath = path.join(folderPath, file);
      fs.lstatSync(curPath).isDirectory() ? deleteFolderRecursive(curPath) : fs.unlinkSync(curPath);
    });
    fs.rmdirSync(folderPath);
  }
}

async function startQRPairing(tempId, onConnected) {
  const { version } = await fetchLatestBaileysVersion();
  const sessionDir = path.join(__dirname, 'store', 'pairing', `qr_${tempId}`);

  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
    version,
    browser: Browsers.ubuntu("Chrome"),
    getMessage: async key => {
      const jid = jidNormalizedUser(key.remoteJid);
      const msg = await store.loadMessage(jid, key.id);
      return msg?.message || '';
    },
  });

  store.bind(sock.ev);

  let didPair = false;

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      try {
        const qrDataUrl = await QRCode.toDataURL(qr, {
          width: 300,
          margin: 2,
          color: { dark: '#1e062a', light: '#ffffff' }
        });
        qrSessions.set(tempId, qrDataUrl);
        console.log(chalk.cyan(`📷 QR code ready for session: ${tempId}`));
      } catch (e) {
        console.error('QR generation error:', e.message);
      }
    }

    if (connection === "close") {
      qrSessions.delete(tempId);

      // If we deliberately closed after pairing, don't restart
      if (didPair) return;

      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;

      if (reason === DisconnectReason.loggedOut) {
        deleteFolderRecursive(sessionDir);
        console.log(chalk.red(`QR session ${tempId} logged out before pairing.`));
      } else if (
        reason === DisconnectReason.connectionClosed ||
        reason === DisconnectReason.connectionLost ||
        reason === DisconnectReason.restartRequired ||
        reason === DisconnectReason.timedOut
      ) {
        console.log(chalk.yellow(`QR session ${tempId} disconnected (${reason}), restarting...`));
        startQRPairing(tempId, onConnected);
      } else {
        console.log(chalk.yellow(`QR session ${tempId} ended: ${reason}`));
      }
    }

    if (connection === "open") {
      didPair = true;
      qrSessions.delete(tempId);

      const rawId = sock.user?.id || '';
      const number = rawId.split(':')[0].split('@')[0];

      console.log(chalk.bgBlue(`✅ QR scan successful: ${number}`));

      // Move session files to the final numbered directory
      const finalDir = path.join(__dirname, 'store', 'pairing', number);
      if (!fs.existsSync(finalDir)) {
        fs.mkdirSync(finalDir, { recursive: true });
      }
      if (fs.existsSync(sessionDir)) {
        const files = fs.readdirSync(sessionDir);
        for (const file of files) {
          fs.copyFileSync(path.join(sessionDir, file), path.join(finalDir, file));
        }
        deleteFolderRecursive(sessionDir);
      }

      // Notify the callback (saves user pairing in DB)
      if (onConnected) onConnected(number);

      // Close this temporary QR socket — pair.js will take over with full bot features
      console.log(chalk.cyan(`🔄 Handing off ${number} to full bot session (no pairing code)...`));
      setTimeout(() => {
        try {
          sock.end(undefined);
        } catch (e) {}
        // Start the full bot session via pair.js — no pairing code for QR method
        const startpairing = require('./pair');
        startpairing(number).catch(e => {
          console.error(`Failed to start full session for ${number}:`, e.message);
        });
      }, 1500);
    }
  });

  sock.ev.on('creds.update', saveCreds);

  return sock;
}

module.exports = { startQRPairing, getQRData };
