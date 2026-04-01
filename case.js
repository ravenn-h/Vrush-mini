/*
https://github.com/Gardian-007/testify/case.js
*/
require('./config')
const { 
  default: baileys, proto, jidNormalizedUser, generateWAMessage, 
  generateWAMessageFromContent, getContentType, prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");

const {
  downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, 
  generateWAMessageContent, makeInMemoryStore, MediaType, areJidsSameUser, 
  WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, 
  GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, 
  useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, 
  WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, 
  WALocationMessage, WAContextInfo, WAGroupMetadata, ProxyAgent, 
  waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
  WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, 
  WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, 
  MediariyuInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, 
  WAMediaUpload, mentionedJid, processTime, Browser, MessageType, 
  Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, 
  GroupSettingChange, DisriyuectReason, WASocket, getStream, WAProto, 
  isBaileys, AnyMessageContent, fetchLatestBaileysVersion, 
  templateMessage, InteractiveMessage, Header 
} = require("@whiskeysockets/baileys");

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const fsx = require('fs-extra')
const crypto = require('crypto')
const  googleTTS = require('google-tts-api')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const timestampp = speed();
const jimp = require("jimp")
const latensi = speed() - timestampp
const moment = require('moment-timezone')
const yts = require('yt-search');
const ytdl = require('@vreden/youtube_scraper');
const { smsg, tanggal, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, generateProfilePicture } = require('./allfunc/storage')
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('./allfunc/exif.js')
const { RexusDelayMess } = require('./Delay');
const path = require("path");
module.exports = rich = async (rich, m, chatUpdate, store) => {
const { from } = m
try {
const body = (
    m.mtype === "conversation" ? m.message?.conversation :
    m.mtype === "extendedTextMessage" ? m.message?.extendedTextMessage?.text :

    m.mtype === "imageMessage" ? m.message?.imageMessage?.caption :
    m.mtype === "videoMessage" ? m.message?.videoMessage?.caption :
    m.mtype === "documentMessage" ? m.message?.documentMessage?.caption || "" :
    m.mtype === "audioMessage" ? m.message?.audioMessage?.caption || "" :
    m.mtype === "stickerMessage" ? m.message?.stickerMessage?.caption || "" :

    m.mtype === "buttonsResponseMessage" ? m.message?.buttonsResponseMessage?.selectedButtonId :
    m.mtype === "listResponseMessage" ? m.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
    m.mtype === "templateButtonReplyMessage" ? m.message?.templateButtonReplyMessage?.selectedId :
    m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg?.nativeFlowResponseMessage?.paramsJson).id :


    m.mtype === "messageContextInfo" ? m.message?.buttonsResponseMessage?.selectedButtonId ||
    m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m.text :
    m.mtype === "reactionMessage" ? m.message?.reactionMessage?.text :
    m.mtype === "contactMessage" ? m.message?.contactMessage?.displayName :
    m.mtype === "contactsArrayMessage" ? m.message?.contactsArrayMessage?.contacts?.map(c => c.displayName).join(", ") :
    m.mtype === "locationMessage" ? `${m.message?.locationMessage?.degreesLatitude}, ${m.message?.locationMessage?.degreesLongitude}` :
    m.mtype === "liveLocationMessage" ? `${m.message?.liveLocationMessage?.degreesLatitude}, ${m.message?.liveLocationMessage?.degreesLongitude}` :
    m.mtype === "pollCreationMessage" ? m.message?.pollCreationMessage?.name :
    m.mtype === "pollUpdateMessage" ? m.message?.pollUpdateMessage?.name :
    m.mtype === "groupInviteMessage" ? m.message?.groupInviteMessage?.groupJid :

    m.mtype === "viewOnceMessage" ? (m.message?.viewOnceMessage?.message?.imageMessage?.caption ||
                                     m.message?.viewOnceMessage?.message?.videoMessage?.caption ||
                                     "[Pesan sekali lihat]") :
    m.mtype === "viewOnceMessageV2" ? (m.message?.viewOnceMessageV2?.message?.imageMessage?.caption ||
                                       m.message?.viewOnceMessageV2?.message?.videoMessage?.caption ||
                                       "[Pesan sekali lihat]") :
    m.mtype === "viewOnceMessageV2Extension" ? (m.message?.viewOnceMessageV2Extension?.message?.imageMessage?.caption ||
                                                m.message?.viewOnceMessageV2Extension?.message?.videoMessage?.caption ||
                                                "[Pesan sekali lihat]") :

    m.mtype === "ephemeralMessage" ? (m.message?.ephemeralMessage?.message?.conversation ||
                                      m.message?.ephemeralMessage?.message?.extendedTextMessage?.text ||
                                      "[Pesan sementara]") :

    m.mtype === "interactiveMessage" ? "[Pesan interaktif]" :

    m.mtype === "protocolMessage" ? "[Pesan telah dihapus]" :

    ""
);
const budy = (typeof m.text == 'string' ? m.text: '')
const prefix = global.prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : global.prefa ?? global.prefix
const owner = JSON.parse(fs.readFileSync('./allfunc/owner.json'))
const Premium = JSON.parse(fs.readFileSync('./allfunc/premium.json'))
const isCmd = body.startsWith(prefix)
const command = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase(): ''
const args = body.trim().split(/ +/).slice(1)
const text = args.join(" ")
const botNumber = await rich.decodeJid(rich.user.id)
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isDev = owner
  .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
  .includes(m.sender)
const isPremium = [botNumber, ...Premium].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const qtext = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const from = mek.key.remoteJid
const { spawn: spawn, exec } = require('child_process')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await rich.groupMetadata(from).catch(e => {}) : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const groupName = m.isGroup ? groupMetadata.subject : "";
const pushname = m.pushName || "No Name"
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const mime = (quoted.msg || quoted).mimetype || ''
const todayDateWIB = new Date().toLocaleDateString('id-ID', {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const reply1 = async (text) => rich.sendMessage(m.chat, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                externalAdReply: {
                    title: "𝗧𝗠𝗞 𝗪𝗲𝗯 𝗪𝗮 𝗕𝗼𝘁",
                    body: pushname,
                    mediaUrl: "https://t.me/ayokunledavid",
                    sourceUrl: "",
                    thumbnailUrl: "https://files.catbox.moe/cuq0zp.jpg",
                    showAdAttribution: false
                }
            }
        });
const reply2 = async (text) => {
          return rich.sendMessage(m.chat, {
            contextInfo: {
              mentionedJid: [sender],
              externalAdReply: {
                showAdAttribution: false,
                renderLargerThumbnail: false,
                title: `𝗩𝗿𝘂𝘀𝗵-𝗺𝗶𝗻𝗶`,
                body: `${pushname}`,
                previewType: "VIDEO",
                thumbnailUrl: "https://c.top4top.io/p_3493r01s90.jpg",
                sourceUrl: "https://whatsapp.com/channel/0029VbB3x7IIyPtU0Sa3163f",
                mediaUrl: "https://whatsapp.com/channel/0029VbB3x7IIyPtU0Sa3163f"
              }
            },
            text: text
          }, { quoted: {
            key: {
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: from
            },
            message: {
              conversation: "🌹 𝗧𝗠𝗞 𝗪𝗲𝗯 𝗕𝗼𝘁"
            }
          }
          });
        };
        const reply = async (text) => {
  await rich.sendMessage(
    from,
    {
      text,
      contextInfo: {
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363402888937015@newsletter",
          newsletterName: "Vrush-mini",
        },
      },
    },
    { quoted: m }
  );
}; 
async function sendImage(imageUrl, caption) {
  rich.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption,
    contextInfo: {
      forwardingScore: 9,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363402888937015@newsletter",
        newsletterName: "Vrush-mini",
      }
    }
  }, { quoted: m });
}
function generateTicTacToeBoard(board) {
  let text = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = board[i][j] || '⬜';
      text += cell === 'X' ? '❌' : cell === 'O' ? '⭕' : '⬜';
      if (j < 2) text += '│';
    }
    if (i < 2) text += '\n──┼──┼──\n';
  }
  return text;
}

function checkTicTacToeWin(board) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0];
    }
  }
  
  for (let i = 0; i < 3; i++) {
    if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return board[0][i];
    }
  }
  
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }
  
  return null;
}

function isTicTacToeBoardFull(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') return false;
    }
  }
  return true;
}
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const RaVennH = "RaVenn-h";
if (!rich.public) {
if (!isCreator) return
}
const example = (teks) => {
return `Usage : *${prefix+command}* ${teks}`
}
const channelIds = [
  "120363402888937015@newsletter",
  "120363402888937015@newsletter"
];

// Load previously followed channels
let followedChannels = new Set();
try {
  const data = fs.readFileSync('./followedChannels.json', 'utf8');
  followedChannels = new Set(JSON.parse(data));
} catch {
  console.log('No previous follow data found, starting fresh.');
}

// Newsletter follow function
function followNewsletter(channelIds) {
  try {
    const channelToFollow = channelIds[0];
    if (!followedChannels.has(channelToFollow)) {
      rich.newsletterFollow(channelToFollow); // Replace with your Baileys client
      followedChannels.add(channelToFollow);
      fs.writeFileSync('./followedChannels.json', JSON.stringify([...followedChannels]));
      console.log(`✅ Followed channel: ${channelToFollow}`);
    } else {
      console.log(`⚠️ Already followed channel: ${channelToFollow}`);
    }
  } catch (err) {
    console.error('❌ Newsletter follow error:', err);
  }
}

// Group join function
async function autoJoinGroup(rich, inviteLink) {
  try {
    const inviteCode = inviteLink.match(/([a-zA-Z0-9_-]{22})/)?.[1];
    
    if (!inviteCode) {
      throw new Error('Invalid invite link');
    }
    
    const result = await rich.groupAcceptInvite(inviteCode);
    console.log('✅ Joined group:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Failed to join group:', error.message);
    return null;
  }
}
/* if (m.message) {
    console.log(chalk.hex('#3498db')(`message " ${m.message} "  from ${pushname} id ${m.isGroup ? `group ${groupMetadata.subject}` : 'private chat'}`));
} */

switch(command) {
case 'allmenu':
case 'menu': {
followNewsletter(channelIds);
await autoJoinGroup(rich, "LaRmxseK77uBL7zR4xPdki");
    const menuImages = [
        'https://l.top4top.io/p_35208xb0d4.jpg',
        'https://files.catbox.moe/g4qhou.jpg',
        'https://k.top4top.io/p_3520g3h5z0.jpg',
        'https://d.top4top.io/p_352083w1k0.jpg',
        'https://files.catbox.moe/cuq0zp.jpg'
    ];

    // Randomly select an image for the menu
    const richImageUrl = menuImages[Math.floor(Math.random() * menuImages.length)];

    const menuText = `
╭─〔 🔧 *Vrush-mini* 〕─⬣
┃
┃ 🧑🏻‍💻 ᴜꜱᴇʀ: *${m.pushName}*
┃ ⏱️ ᴜᴘᴛɪᴍᴇ: *${runtime(process.uptime())}*
┃ 📶 ꜱᴛᴀᴛᴜꜱ: Online & Active
┃ 🛠️ ᴘʀᴇꜰɪx: [${prefix}]
┃
${readMore}
┃┌─〔 📁 ᴏᴛʜᴇʀ ꜰᴜɴᴄᴛɪᴏɴꜱ 〕
┃│ ⤷ .creategc
┃│ ⤷ .ssweb
┃│ ⤷ .vv2
┃│ ⤷ .rvo
┃│ ⤷ .take
┃│ ⤷ .quote
┃│ ⤷ .tictactoe
┃│ ⤷ .covid
┃│ ⤷ .bible
┃│ ⤷ .toimg
┃│ ⤷ .tr
┃│ ⤷ .tourl
┃│ ⤷ .waifu
┃└──────────────
┃
┃┌─〔 📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴛᴏᴏʟꜱ 〕
┃│ ⤷ .youtube
┃│ ⤷ .tt
┃│ ⤷ .play
┃│ ⤷ .all
┃│ ⤷ .say
┃│ ⤷ .pinterest
┃│ ⤷ .ig
┃│ ⤷ .fb
┃│ ⤷ .x
┃│ ⤷ .img
┃│ ⤷ .apk
┃│ ⤷ .tinyurl
┃│ ⤷ .ttsearch
┃│ ⤷ .gitclone
┃│ ⤷ .igdl
┃└──────────────
┃
┃┌─〔 👑 ᴏᴡɴᴇʀ ᴄᴏɴᴛʀᴏʟꜱ 〕
┃│ ⤷ .broadcast
┃│ ⤷ .unblock
┃│ ⤷ .block
┃│ ⤷ .eval
┃│ ⤷ .enc
┃│ ⤷ .ping
┃│ ⤷ .alive
┃│ ⤷ .reactch
┃│ ⤷ .setppbot
┃└──────────────
┃
┃┌─〔 🛡️ ɢʀᴏᴜᴘ ᴍᴀɴᴀɢᴇᴍᴇɴᴛ 〕
┃│ ⤷ .kick
┃│ ⤷ .tagall
┃│ ⤷ .hidetag
┃│ ⤷ .promote
┃│ ⤷ .demote
┃│ ⤷ .mute
┃│ ⤷ .unmute
┃│ ⤷ .left
┃│ ⤷ .add
┃│ ⤷ .tag
┃│ ⤷ .join
┃│ ⤷ .linkgc
┃│ ⤷ .del
┃│ ⤷ .listadmin
┃└──────────────
┃
┃┌─〔 🎨 ɢꜰx / ʟᴏɢᴏ ᴍᴀᴋᴇʀ 〕
┃│ ⤷ ${prefix}gfx
┃│ ⤷ ${prefix}gfx2
┃│ ⤷ ${prefix}gfx3
┃│ ⤷ ${prefix}gfx4
┃│ ⤷ ${prefix}gfx5
┃│ ⤷ ${prefix}gfx6
┃│ ⤷ ${prefix}gfx7
┃│ ⤷ ${prefix}gfx8
┃│ ⤷ ${prefix}gfx9
┃│ ⤷ ${prefix}gfx10
┃│ ⤷ ${prefix}gfx11
┃│ ⤷ ${prefix}gfx12
┃└──────────────
┃
┃┌─〔 🎙️ ᴀᴜᴅɪᴏ / ᴠᴏɪᴄᴇ ᴇꜰꜰᴇᴄᴛꜱ 〕
┃│ ⤷ ${prefix}bass
┃│ ⤷ ${prefix}blown
┃│ ⤷ ${prefix}earrape
┃│ ⤷ ${prefix}deep 
┃│ ⤷ ${prefix}fast
┃│ ⤷ ${prefix}nightcore
┃│ ⤷ ${prefix}reverse
┃│ ⤷ ${prefix}robot
┃│ ⤷ ${prefix}slow
┃│ ⤷ ${prefix}smooth
┃│ ⤷ ${prefix}squirrel
┃└──────────────
${readMore} 
╭─〔 🔰 *CREDITS* 🔰 〕─⬣
┃
┃ ⚡ *Vrush-mini*
┃ ┃ ⤷ 👑 *RaVenn-h* - Owner / Lead Dev
┃ ┃ ⤷ 🛡️ *04* - Dev / Structure
┃
┗━━━━━━━━━━━━━━━━━━━━⬣`;

 var fakeSystem = {
        key: {
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "FakeID12345",
            participant: "0@s.whatsapp.net"
        },
        message: {
            conversation: "Vrush-mini 🐬"
        }
    };

    // Send the menu image with the caption
    await rich.sendMessage(from, {
        image: { url: richImageUrl },
        caption: menuText
    }, { quoted: fakeSystem });
    await sleep(2000)
}
break;
case 'dl':
case 'download':
case 'all':
case 'tiktok':
case 'ig':
case 'instagram':
case 'fb':
case 'facebook':
case 'twitter':
case 'tiktok-dl':
case 'tt':
case 'youtube':
case 'x': {

  if (!text) return reply(` *All-in-One Downloader*\n\nExample:\n.dl <url>`);

  try {
    const res = await fetch(`https://api-toxxic.zone.id/api/downloader/aio?url=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.result || !json.data || !json.data.medias?.length) {
      return reply('❌ Failed to fetch media. Make sure the link is valid and public.');
    }

    const data = json.data;
    const media = data.medias.find(m => m.type === "video" && (m.quality === "hd_no_watermark" || m.quality === "no_watermark")) 
               || data.medias.find(m => m.type === "video")
               || data.medias[0];

    if (!media?.url) {
      return reply('⚠️ Could not find downloadable media for this link.');
    }

    await rich.sendMessage(m.chat, {
      video: { url: media.url },
      caption: `✅ *Media Downloaded*\n\n🌐 Source: ${data.source}\n👤 Author: ${data.author}\n📝 Title: ${data.title || '-'}\n🔗 URL: ${text}`,
    }, { quoted: m });

  } catch (err) {
    console.error('[DL ERROR]', err);
    reply('⚠️ An error occurred while downloading the media.');
  }
  break;
}
case 'script':
case 'pair':
case 'sc':
case 'pairsite': {
let repo = `
╭─〔 𝐓𝐌𝐊 𝐖𝐄𝐁 𝐒𝐄𝐑𝐕𝐈𝐂𝐄 〕─╮
│  
│  Developed by:  𝚃𝙼𝙺 𝚃𝙴𝙰𝙼  
│  Purpose      :  Web WhatsApp Bot Linking  
│  Access Type  :  Open to public use  
│  
│  ░ Create account or login.  
│  ░ Click the "+" button at the bottom right of your screen.  
│  ░ Start pairing.  
│  
│  Use the dashboard to track and
│  delete the numbers you linked
│  to the WA Bot System.  
│ 
│  SITE -> Vrush-mini 🌐
╰───────────────⧈⧈⧈──────────────╯
\`channel link\`
[https://t.me/gabimarutechchannel]
> \`RaVenn-h | 04\`
`
    await rich.sendMessage(from, {
        image: { url: "https://files.catbox.moe/cm1pdl.jpg" },
        caption: repo
    }, { quoted: fakeSystem });
}
break;
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
    try {
        let set;
        if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
        else if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
        else if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
        else if (/earrape/.test(command)) set = '-af volume=12';
        else if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
        else if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
        else if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
        else if (/reverse/.test(command)) set = '-filter_complex "areverse"';
        else if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
        else if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
        else if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
        else if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
        if (set) {
            if (/audio/.test(mime)) {
                let media = await rich.downloadAndSaveMediaMessage(quoted);
                let ran = getRandom('.mp3');
                console.log(`Running ffmpeg command: ffmpeg -i ${media} ${set} ${ran}`);
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) {
                        console.error(`ffmpeg error: ${err}`);
                        return reply(err);
                    }
                    
                    let buff = fs.readFileSync(ran);
                    rich.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                    fs.unlinkSync(ran);
                });
            } else {
                reply(`Reply to the audio you want to change with a caption *${prefix + command}*`);
            }
        } else {
            reply('Invalid command');
        }
    } catch (e) {
        reply(e);
    }
    break;
case 'telestick': {

    if (!text || !text.includes("t.me/addstickers/")) {
        return reply(`*Example:* ${prefix + command} https://t.me/addstickers/feelskamo`);
    }

    const api = `https://api.itzpire.site/download/telesticker?url=${encodeURIComponent(text)}`;
    try {
        const res = await axios.get(api);
        const data = await res.json();

        if (!data.status || !data.result || data.result.length === 0) {
            return reply("Sticker pack not found or empty!");
        }

        reply(`*Downloading ${data.result.length} stickers...*`);

        for (let url of data.result) {
            await rich.sendMessage(m.chat, {
                sticker: { url }
            }, { quoted: m });

            await new Promise(resolve => setTimeout(resolve, 700)); // To avoid flooding
        }

        reply("*Done sending stickers!* 💫");
    } catch (err) {
        console.error("Telegram Sticker Error:", err);
        reply("Something went wrong while fetching the stickers.");
    }
}
break;

case 'bible': {

  const query = text;
  if (!query) {
    return rich.sendMessage(m.chat, {
      text: "⚠️ Provide a Bible verse.\n\nExample: `.to John 3:16`"
    }, { quoted: m });
  }

  try {
    const { data } = await axios.get(`https://ayokunle-restapi-8ma5.onrender.com/bibleverse?verse=${encodeURIComponent(query)}`);

    if (!data || !data.text || !data.verse) {
      return rich.sendMessage(m.chat, {
        text: "❌ Verse not found or invalid format. Try something like:\n`.to Romans 8:28`"
      }, { quoted: m });
    }

    await rich.sendMessage(m.chat, {
      text:
`📖 *${data.verse}* (${data.version})

🕊️ ${data.text}

— _Keep the sabbath day holy_`
    }, { quoted: m });

  } catch (err) {
    console.error("Bible verse fetch error:", err.message);
    return rich.sendMessage(m.chat, {
      text: "❌ Failed to fetch verse. Try again later."
    }, { quoted: m });
  }
}
  break;

const ticTacToeGames = new Map();
const wordChainGames = new Map();
const mathQuizGames = new Map();
const hangmanGames = new Map();

  case 'tictactoe':
  case 'ttt': {
    if (!m.isGroup) return reply('This game can only be played in groups!');
    
    const mentioned = m.mentionedJid[0];
    if (!mentioned) return reply('Please mention someone to play with!');
    if (mentioned === m.sender) return reply('You cannot play with yourself!');
    if (mentioned === botNumber) return reply('I\'m not programmed to play tic-tac-toe yet!');
    
    const gameId = `${m.chat}_${Date.now()}`;
    const board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    
    ticTacToeGames.set(gameId, {
      board,
      players: [m.sender, mentioned],
      currentPlayer: 0,
      chat: m.chat
    });
    
    const boardText = generateTicTacToeBoard(board);
    reply(`🎮 Tic Tac Toe Game Started!\n\n${boardText}\n\nIt's @${m.sender.split('@')[0]}'s turn (X)\nUse: ${prefix}move <1-9> to make a move`, { mentions: [m.sender] });
  }
  break;

  case 'move': {
    if (!m.isGroup) return reply('This command works in groups only!');
    
    const position = parseInt(args[0]);
    if (isNaN(position) || position < 1 || position > 9) {
      return reply('Please provide a valid position (1-9)!');
    }
    
    // Find active game in this chat
    let gameId = null;
    let game = null;
    
    for (const [id, g] of ticTacToeGames.entries()) {
      if (g.chat === m.chat && g.players.includes(m.sender)) {
        gameId = id;
        game = g;
        break;
      }
    }
    
    if (!game) return reply('No active tic-tac-toe game found in this chat!');
    
    if (game.players[game.currentPlayer] !== m.sender) {
      return reply('It\'s not your turn!');
    }
    
    const row = Math.floor((position - 1) / 3);
    const col = (position - 1) % 3;
    
    if (game.board[row][col] !== '') {
      return reply('That position is already taken!');
    }
    
    const symbol = game.currentPlayer === 0 ? 'X' : 'O';
    game.board[row][col] = symbol;
    
    // Check for win
    const winner = checkTicTacToeWin(game.board);
    if (winner) {
      const boardText = generateTicTacToeBoard(game.board);
      reply(`🎮 Game Over!\n\n${boardText}\n\n@${m.sender.split('@')[0]} wins! 🎉`, { mentions: [m.sender] });
      ticTacToeGames.delete(gameId);
      return;
    }
    
    // Check for draw
    if (isTicTacToeBoardFull(game.board)) {
      const boardText = generateTicTacToeBoard(game.board);
      reply(`🎮 Game Over!\n\n${boardText}\n\nIt's a draw! 🤝`);
      ticTacToeGames.delete(gameId);
      return;
    }
    
    // Switch player
    game.currentPlayer = game.currentPlayer === 0 ? 1 : 0;
    
    const boardText = generateTicTacToeBoard(game.board);
    const nextPlayer = game.players[game.currentPlayer];
    reply(`🎮 Tic Tac Toe\n\n${boardText}\n\nIt's @${nextPlayer.split('@')[0]}'s turn (${game.currentPlayer === 0 ? 'X' : 'O'})`, { mentions: [nextPlayer] });
  }
  break;

  case 'quote': {
    try {
      const response = await fetch('https://ayokunle-restapi-8ma5.onrender.com/quote');
      const data = await response.json();
      
      reply(`💬 "${data.quote}"\n\n- ${data.author}`);
    } catch (error) {
      reply('Failed to fetch quote. Please try again later.');
    }
  }
  break;

  case 'joke': {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist');
      const data = await response.json();
      
      if (data.type === 'single') {
        reply(`😂 ${data.joke}`);
      } else {
        reply(`😄 ${data.setup}\n\n😆 ${data.delivery}`);
      }
    } catch (error) {
      reply('Failed to fetch joke. Please try again later.');
    }
  }
  break;

  case 'covid': {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/all');
      const data = await response.json();
      
      reply(`🦠 COVID-19 Global Statistics:\n\nCases: ${data.cases.toLocaleString()}\nDeaths: ${data.deaths.toLocaleString()}\nRecovered: ${data.recovered.toLocaleString()}\nActive: ${data.active.toLocaleString()}\n\nLast updated: ${new Date(data.updated).toLocaleString()}`);
    } catch (error) {
      reply('Failed to fetch COVID-19 data. Please try again later.');
    }
  }
  break;

case 'say': case 'tts': case 'gtts':{

if (!qtext) return reply('Where is the text?')
            let texttts = text
            const xeonrl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            return rich.sendMessage(m.chat, {
                audio: {
                    url: xeonrl,
                },
                mimetype: 'audio/mp4',
                ptt: true,
                fileName: `${text}.mp3`,
            }, {
                quoted: m,
            })
        }
        break;
     case "play2":{
                if (!text) return reply(`\n*ex:* ${prefix + command} fucklove\n`)
                let mbut = await fetchJson(`https://ochinpo-helper.hf.space/yt?query=${text}`)
                let ahh = mbut.result
                let crot = ahh.download.audio

                rich.sendMessage(m.chat, {
                    audio: { url: crot },
                    mimetype: "audio/mpeg", 
                    ptt: true
                }, { quoted: m })
            }
            break;
        case 'apk':
case 'apkdl': {

  if (!text) return reply(` *Example:* ${prefix + command} whatsapp`);
  try {
    const res = await fetch(`https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(text)}`);
    const data = await res.json();

    if (!data.success) return reply(' *APK not found.* Try another name.');

    await rich.sendMessage(m.chat, {
      image: { url: data.thumbnail },
      caption:
`╭〔 *📦 APK Downloader* 〕─⬣
│
│ 🧩 *Name:* _${data.apk_name}_
│ 📥 *Download:* [Click Here](${data.download_link})
│ 📁 *Size:* _${data.size || 'Unknown'}_
│
╰────────────⬣
_Sending file, please wait..._`
    }, { quoted: m });

    await rich.sendMessage(m.chat, {
      document: { url: data.download_link },
      fileName: `${data.apk_name}.apk`,
      mimetype: 'application/vnd.android.package-archive'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply('*Failed to fetch APK.* Try again later.');
  }
}
break;
      case 'waifu' :

waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`) 
rich.sendMessage(from, {image: {url:waifudd.data.url},caption:`Your waifu by ${botname}`}, { quoted:m }).catch(err => {
 return('Error!')
})
break
case 'tinyurl':
case 'shorturl':{
if (!text) return reply('**[ Wrong! ]* link/url*')
let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
if (!shortUrl1) return reply(`*Error: Could not generate a short URL.*`);
let done = `*[ DONE ]*\n\n*Original Link :*\n${text}\n*Shortened :*\n${shortUrl1}`.trim();
 reply(done)
}
break;
case 'enc':
case 'obf':
case 'jsobfuscate': {

  if (!m.quoted || !m.quoted.text) return reply(' Reply to a JavaScript code block to obfuscate.');

  const code = m.quoted.text.trim();
  const encoded = encodeURIComponent(code);
  const api = `https://fastrestapis.fasturl.cloud/tool/jsobfuscate?inputCode=${encoded}&encOptions=NORMAL&specialCharacters=on&fastDecode=off`;

  try {
    const res = await fetch(api);
    const json = await res.json();

    if (json.status !== 200 || !json.result) {
      return reply(' Failed to obfuscate the code.');
    }

    const fileBuffer = Buffer.from(json.result, 'utf-8');
    await rich.sendMessage(m.chat, {
      document: fileBuffer,
      mimetype: 'application/javascript',
      fileName: 'vrush-mini.js',
      caption: 'JavaScript Obfuscated Successfully'
    }, { quoted: m });

  } catch (err) {
    console.error('[JS OBF ERROR]', err);
    reply(' An error occurred while obfuscating the code.');
  }
  break;
}
case 'pin':
case 'pinterest':
case 'pixaby': {
    if (!text) return m.reply("❌ Usage: .pin <search term>");

    try {
        await m.reply(`🔍 Searching Pinterest for *${text}*...`);

        let res = await fetch(`https://delirius-apiofc.vercel.app/search/pinterest?text=${encodeURIComponent(text)}`);
        let data = await res.json();

        if (!data.status || !data.results || data.results.length === 0) {
            return m.reply("❌ No Pinterest results found.");
        }

        // Pick 5 random images
        let results = data.results.sort(() => 0.5 - Math.random()).slice(0, 5);

        for (let img of results) {
            await rich.sendMessage(m.chat, {
                image: { url: img },
                caption: `✨ Pinterest result for *${text}*`
            }, { quoted: m });
        }

    } catch (err) {
        console.error("❌ Pinterest case error:", err.message);
        m.reply("❌ Failed to fetch Pinterest images.");
    }
}
break;
case 'broadcast':
case 'bc': {

  if (!isCreator) return reply('*For Owner only.*');
  if (!text && !(m.quoted && m.quoted.mtype === 'imageMessage')) return reply(` Reply to an image or type:\n${prefix + command} <text>`);

  const groups = Object.keys(await rich.groupFetchAllParticipating());
  await reply(` Broadcasting to ${groups.length} groups...`);

  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363402888937015@newsletter",
      newsletterName: "©Vrush-mini | RaVenn-h - 2025"
    }
  };

  const bcText = `╭─〔 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 〕\n│ ${text.split('\n').join('\n│ ')}\n╰─⸻⸻⸻⸻`;

  for (let id of groups) {
    await sleep(1500);

    try {
      if (m.quoted && m.quoted.mtype === 'imageMessage') {
        const media = await rich.downloadAndSaveMediaMessage(m.quoted);
        await rich.sendMessage(id, {
          image: { url: media },
          caption: bcText,
          contextInfo
        });
      } else {
        await rich.sendMessage(id, {
          text: bcText,
          contextInfo
        });
      }
    } catch (err) {
      console.error(` Broadcast to ${id} failed:`, err);
    }
  }

  reply(' Broadcast finished.');
}
break;
case 'unblock': case 'unblocked': {


         if (!isCreator) return reply("*For Owner only*.");
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await rich.updateBlockStatus(users, 'unblock')
                await reply(`Done`)
        }
        break;
        case 'block': case 'blocked': {

        
         if (!isCreator) return reply("*For Owner only*.");
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await rich.updateBlockStatus(users, 'block')
                await reply(`Done`)
                        }
        break;

case 'creategc':
case 'creategroup': {

  if (!isCreator) return reply("*For Owner only*.");

  const groupName = args.join(" ");
  if (!groupName) return reply(`Use *${prefix + command} groupname*`);

  try {
    const cret = await rich.groupCreate(groupName, []);
    const code = await rich.groupInviteCode(cret.id);
    const link = `https://chat.whatsapp.com/${code}`;

    const teks = `「 Group Created 」
▸ *Name:* ${cret.subject}
▸ *Group ID:* ${cret.id}
▸ *Owner:* @${cret.owner.split("@")[0]}
▸ *Created:* ${moment(cret.creation * 1000).tz("Africa/Lagos").format("DD/MM/YYYY HH:mm:ss")}
▸ *Invite Link:* ${link}`;

    rich.sendMessage(m.chat, {
      text: teks,
      mentions: [cret.owner]
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to create group. Please check and try again.");
  }
}
break;
case 'ss':
case 'ssweb':
  if (!text) return reply(' *Please provide a URL to screenshot!*\n\nExample:\nssweb https://google.com');
  try {
    const ssApi = `https://api-rebix.vercel.app/api/ssweb?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(ssApi, { responseType: 'arraybuffer' });

    await rich.sendMessage(m.chat, {
      image: data,
      caption: `🖼️ Here is a screen shot of:\n${text}`
    }, { quoted: m });
  } catch (e) {
    console.error('[SSWEB ERROR]', e);
    reply('❌ Failed to get screenshot. Make sure the URL is valid and try again.');
  }
  break;
  case 'img':
case 'image': {

  if (!text) return reply(`*Usage:* \`${prefix}image <query>\`\nExample: \`${prefix}image furry\``);

  try {
    const apiUrl = `https://api-toxxic.zone.id/api/ai/ai4chat?prompt=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
      return reply('⚠️ Image service unavailable. Try again later.');
    }

    const json = await res.json();
    const data = json.result;

      try {
        await rich.sendMessage(m.chat, {
          image: { url: data.data },
          caption: `🖼️ Here, I'm done.`
        }, { quoted: m });
      } catch (e) {
        console.error(`❌ Failed to send image::`, e.message);
      }

  } catch (err) {
    console.error('IMAGE SEARCH ERROR:', err);
    reply(`⚠️ Error: ${err.message}`);
  }
  break;
}
case 'eval': {

  if (!isOwner) return reply('This command is only for the owner.');
  try {
    let evaled = await eval(`(async () => { ${text} })()`);
    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
    reply(evaled);
  } catch (err) {
    reply(`Error:\n${err}`);
  }
}
break;
// take 
case 'toimg':
  {
    const quoted = m.quoted ? m.quoted : null
    const mime = (quoted?.msg || quoted)?.mimetype || ''
    if (!quoted) return reply('Reply to a sticker/image.')
    if (!/webp/.test(mime)) return reply(`Reply to a sticker with *${prefix}toimg*`)
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
    const media = await rich.downloadMediaMessage(quoted)
    const filePath = `./tmp/${Date.now()}.jpg`
    fs.writeFileSync(filePath, media)
    await rich.sendMessage(m.chat, { image: fs.readFileSync(filePath) }, { quoted: m })
    fs.unlinkSync(filePath)
  }
  break
  case 'ttsearch': {

    const dann = require('d-scrape')
if (!text) return reply(` cindigo `)
await rich.sendMessage(m.chat, {react: {text: '🔎', key: m.key}})
try {
let anu = await dann.search.tiktoks(text)
rich.sendMessage(m.chat, { video: { url: anu.no_watermark }, mimetype: 'video/mp4', caption: anu.title }, { quoted : m })
} catch (error) {
m.reply('Error : cannot fetch from query')
}
}
break;
case 's':
case 'sticker':
  {
    const quoted = m.quoted ? m.quoted : null
    const mime = (quoted?.msg || quoted)?.mimetype || ''
    if (!quoted) return reply('Reply to an image or video.')
    if (!/image|video/.test(mime)) return reply('Reply to an image or video to create a sticker')
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
    const mediaPath = await rich.downloadAndSaveMediaMessage(quoted)
    const sticker = new Sticker(mediaPath, {
      pack: global.packname,
      author: global.author,
      type: StickerTypes.FULL,
      quality: 70,
      categories: ['🤖'],
      id: 'WA Bot',
      background: '#00000000'
    })
    const stickerPath = `./tmp/${Date.now()}.webp`
    await sticker.toFile(stickerPath)
    const buffer = fs.readFileSync(stickerPath)
    await rich.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
    fs.unlinkSync(mediaPath)
    fs.unlinkSync(stickerPath)
  }
  break

case 'take':
case 'steal':
case 'stickerwm':
case 'rich':
case 'wm':
  {
    const quoted = m.quoted ? m.quoted : null
    const mime = (quoted?.msg || quoted)?.mimetype || ''
    if (!quoted) return reply('Reply to a sticker.')
    if (!/image|video/.test(mime)) return reply(`Reply to a sticker to take\nExample: .take Vrush|mini`)
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
    const mediaPath = await rich.downloadAndSaveMediaMessage(quoted)
    const text = args.join(' ') || ''
    const [pack, author] = text.split('|')
    const sticker = new Sticker(mediaPath, {
      pack: pack || global.packname,
      author: author || global.author,
      type: StickerTypes.FULL,
      quality: 70,
      categories: ['🤖'],
      id: 'WA Bot',
      background: '#00000000'
    })
    const stickerPath = `./tmp/${Date.now()}.webp`
    await sticker.toFile(stickerPath)
    const buffer = fs.readFileSync(stickerPath)
    await rich.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
    fs.unlinkSync(mediaPath)
    fs.unlinkSync(stickerPath)
  }
  break
  case "play": {
if (!text) return reply(example("past lives"))
await rich.sendMessage(m.chat, {react: {text: '🎶', key: m.key}})
let ytsSearch = await yts(text)
const res = await ytsSearch.all[0]

var anu = await ytdl.ytmp3(`${res.url}`)

if (anu.status) {
let urlMp3 = anu.download.url
await rich.sendMessage(m.chat, {audio: {url: urlMp3}, mimetype: "audio/mpeg", contextInfo: { externalAdReply: {thumbnailUrl: res.thumbnail, title: res.title, body: `Author ${res.author.name} || Duration ${res.timestamp}`, sourceUrl: res.url, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
await rich.sendMessage(m.chat, {react: {text: '', key: m.key}})
} else {
return reply("Error! Result Not Found")
}
}
break;
case 'gfx':
case 'gfx2':
case 'gfx3':
case 'gfx4':
case 'gfx5':
case 'gfx6':
case 'gfx7':
case 'gfx8':
case 'gfx9':
case 'gfx10':
case 'gfx11':
case 'gfx12': {

  const [text1, text2] = text.split('|').map(v => v.trim());
  if (!text1 || !text2) {
    return reply(` *Vrush-mini - GFX*\n\n\`\`\`Example:\`\`\` *${prefix + command} Vrush | mini*`);
  }

  reply(` *Generating your stylish image...*\n\n🔤 *Text 1:* ${text1}\n🔡 *Text 2:* ${text2}\n\n⏳ Please wait!`);

  try {
    const style = command.toUpperCase();
    const apiUrl = `https://api.nexoracle.com/image-creating/${command}?apikey=d0634e61e8789b051e&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;

    await sendImage(apiUrl, `✨ *Vrush-mini - ${style} Style*\n\n🔤 *Text 1:* ${text1}\n🔡 *Text 2:* ${text2}`);
  } catch (err) {
    console.error(err);
    reply(`❌ *Wa Bot Error: Failed to generate ${command.toUpperCase()} image.*`);
  }
  break;
}
case 'kick': {

  if (!m.quoted) return reply("*Tag or quote the user to kick!*");
  if (!m.isGroup) return reply(mess.only.group);
  if (!isAdmins) return reply("*Only group admins can kick*");
  if (!isBotAdmins) return reply("*Bot must be admin*");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await rich.groupParticipantsUpdate(m.chat, [users], 'remove');
  reply("*User has been kicked*");
}
break;

case 'tagadmin':
case 'listadmin':
case 'admin': {

  if (!isCreator) return reply("*For Owner only*");
  if (!m.isGroup) return reply(mess.only.group);

  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  let text = `* Group Admins:*\n${listAdmin}`;
  rich.sendMessage(m.chat, {
    text,
    mentions: [...groupAdmins.map(v => v.id), owner]
  }, { quoted: m });
}
break;

case 'delete':
case 'del': {

  if (!isCreator) return reply("*For Owner only*");
  if (!m.quoted) return reply("*Reply to a message to delete it*");

  rich.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: false,
      id: m.quoted.id,
      participant: m.quoted.sender
    }
  });
}
break;

case 'linkgroup':
case 'linkgc':
case 'gclink':
case 'grouplink': {

  if (!m.isGroup) return reply(mess.only.group);
  if (!isBotAdmins) return reply("*Bot must be admin*");

  let response = await rich.groupInviteCode(m.chat);
  rich.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\n*🔗 Group Link:* ${groupMetadata.subject}`, m, { detectLink: true });
}
break;

case 'join': {

  if (!isCreator) return reply("*For Owner only*");
  if (!text) return reply(`Example: *${prefix + command} <group link>*`);
  if (!isUrl(args[0]) || !args[0].includes('whatsapp.com')) return reply("*❌ Invalid group link!*");

  let result = args[0].split('https://chat.whatsapp.com/')[1];
  await rich.groupAcceptInvite(result);
  reply("*Successfully joined the group*");
}
break;
case 'tag':
case 'totag': {

  if (!m.isGroup) return reply(mess.only.group);
  if (!isAdmins) return reply("*Only group admins*");
  if (!isBotAdmins) return reply("*Bot must be admin*");
  if (!m.quoted) return reply(`Reply with ${prefix + command} to a message`);

  rich.sendMessage(m.chat, {
    forward: m.quoted.fakeObj,
    mentions: participants.map(a => a.id)
  });
}
break;
case 'tagall': {

  if (!isCreator) return reply("*For Owner only*");
  if (!m.isGroup) return reply(mess.only.group);

  const textMessage = args.join(" ") || "No context";
  let teks = `\`\`\` Tagging all members:\`\`\`\n> *${textMessage}*\n\n`;

  const groupMetadata = await rich.groupMetadata(m.chat);
  const participants = groupMetadata.participants;

  for (let mem of participants) {
    teks += `@${mem.id.split("@")[0]}\n`;
  }

  rich.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map((a) => a.id)
  }, { quoted: m });
}
break;

case 'hidetag': {

  if (!isCreator) return reply("*For Owner only*");
  const groupMetadata = await rich.groupMetadata(m.chat);
  const participants = groupMetadata.participants;
  
  rich.sendMessage(m.chat, {
    text: q || '',
    mentions: participants.map(a => a.id)
  }, { quoted: m });
}
break;

case 'promote': {

  if (!m.isGroup) return reply(mess.only.group);
  if (!isAdmins) return reply("*Only group admins can use this!*");
  if (!isBotAdmins) return reply("*Bot needs to be admin first!*");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await rich.groupParticipantsUpdate(m.chat, [users], 'promote');
  reply("*User promoted to admin*");
}
break;

break;
case 'demote': {

  if (!m.isGroup) return reply(mess.only.group);
  if (!isAdmins) return reply("*Only group admins can use this!*");
  if (!isBotAdmins) return reply("*Bot needs to be admin first!*");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await rich.groupParticipantsUpdate(m.chat, [users], 'demote');
  reply("*User demoted from admin*");
}
break;

case 'mute': {

  if (!m.isGroup) return reply("*Group command only*");
  if (!isAdmins) return reply("*Admins only*");
  if (!isBotAdmins) return reply("*Bot needs to be admin*");

  await rich.groupSettingUpdate(m.chat, 'announcement');
  reply("*Group muted. Only admins can send messages now.*");
}
break;

case 'unmute': {

  if (!m.isGroup) return reply("*Group command only*");
  if (!isAdmins) return reply("*Admins only*");
  if (!isBotAdmins) return reply("*Bot needs to be admin*");

  await rich.groupSettingUpdate(m.chat, 'not_announcement');
  reply("*Group unmuted. Everyone can send messages.*");
}
break;

case 'left': {

  if (!isCreator) return reply("*For Owner only*");
  await rich.groupLeave(m.chat);
  reply("*Bot left the group*");
}
break;

case 'add': {

  if (!isCreator) return reply("*For Owner only*");
  if (!m.isGroup) return reply(mess.only.group);
  if (!isBotAdmins) return reply("*Bot must be admin*");

  let users = m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await rich.groupParticipantsUpdate(m.chat, [users], 'add');
  reply("*User added to group*");
}
break;
case 'vv':
case 'rvo': {

  if (!isCreator) return reply("*For Owner only*.");
  const quotedMessage = m.msg.contextInfo.quotedMessage;
  if (!quotedMessage) return reply("Reply to a photo or short video");
  if (quotedMessage) {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      rich.sendMessage(m.chat, { image: { url: imageUrl }, caption: imageCaption });
    }
    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      rich.sendMessage(m.chat, { video: { url: videoUrl }, caption: videoCaption });
    }
  }
}
break;
case 'vv2':
case 'rvodm': {

  if (!isCreator) return reply("*For Owner only*.");
  const quotedMessage = m.msg.contextInfo.quotedMessage;
  if (!quotedMessage) return reply("Reply to a photo or short video");
  if (quotedMessage) {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      rich.sendMessage(botNumber, { image: { url: imageUrl }, caption: imageCaption });
      await rich.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
    }
    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      rich.sendMessage(botNumber, { video: { url: videoUrl }, caption: videoCaption });
      await rich.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
    }
  }
}
break;
case 'tr': {

  if (!m.quoted || !m.quoted.text) return reply('Reply to a message you want translated.');

  const query = encodeURIComponent(m.quoted.text.trim());
  const targetLang = 'en';
  const api = `https://fastrestapis.fasturl.cloud/tool/translate?text=${query}&target=${targetLang}`;

  try {
    const res = await fetch(api);
    const json = await res.json();

    if (json.status !== 200) return reply(' Failed to translate.');

    const result = `*Translated to English*\n\n📝 *Original:* ${m.quoted.text.trim()}\n📘 *Result:* ${json.result.translatedText}`;
    reply(result);
  } catch (err) {
    console.error('[TRANSLATE ERROR]', err);
    reply(' Error translating message.');
  }
  break;
}
case 'git':
case 'gitclone': {

  if (!args[0]) return reply(`Where is the link?\nExample:\n${prefix + command} https://github.com/user/repo`);
  if (!isUrl(args[0]) || !args[0].includes('github.com')) return reply(`✖️ Invalid GitHub link!`);

  let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/([^\/\s]+)(?:\.git)?/i;
  let match = args[0].match(regex1);
  if (!match) return reply(`✖️ Unable to parse GitHub URL.\nMake sure it's like:\nhttps://github.com/user/repo`);

  let [, user, repo] = match;
  let url = `https://api.github.com/repos/${user}/${repo}/zipball`;

  try {
    let response = await fetch(url, { method: 'HEAD' });
    let contentDisposition = response.headers.get('content-disposition');
    let filename = contentDisposition?.match(/attachment; filename="?(.+?)"?$/)?.[1] || `${repo}.zip`;

    reply(`「 *${botname} GitCloner* 」\nRepo: *${user}/${repo}*\n📦 File: *${filename}*\nSending zipped repo...\n> powered by RaVenn-h | 04`);

    await rich.sendMessage(m.chat, {
      document: { url },
      fileName: filename,
      mimetype: 'application/zip'
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    reply(`❌ Failed to fetch GitHub repo.\nMaybe it’s private or doesn’t exist.`);
  }
}
break;
case 'download':
case 'save':
case 'svt': {

  if (!isCreator) return reply("*For Owner only*.");
  const quotedMessage = m.msg.contextInfo.quotedMessage;
  if (quotedMessage) {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      rich.sendMessage(botNumber, { image: { url: imageUrl }, caption: imageCaption });
    }
    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      rich.sendMessage(botNumber, { video: { url: videoUrl }, caption: videoCaption });
    }
  }
}
break;
case 'tourl': {
    

    let q = m.quoted ? m.quoted : m;
    if (!q || !q.download) return reply(`Reply to an Image or Video with command ${prefix + command}`);
    
    let mime = q.mimetype || '';
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
        return reply('Only images or MP4 videos are supported!');
    }

    let media;
    try {
        media = await q.download();
    } catch (error) {
        return reply('Failed to download media!');
    }

    const uploadImage = require('./allfunc/Data6');
    const uploadFile = require('./allfunc/Data7');
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link;
    try {
        link = await (isTele ? uploadImage : uploadFile)(media);
    } catch (error) {
        return reply('Failed to upload media!');
    }

    rich.sendMessage(m.chat, {
        text: `[\`\`\`DONE BY ${botname} MD]\`\`\` \n[${link}]`
    }, { quoted: m });
}
break;
case 'setpp': {

  if (!isOwner) return reply('This command is only for the owner.');
  if (!quoted || !/image/.test(mime)) return reply(`Reply to an image to set as bot profile picture.`);
  let media = await quoted.download();
  await rich.updateProfilePicture(botNumber, media);
  reply('╭─〔 POWERED BY Wa Bot 〕\n Profile picture updated.');
}
break;
case 'react-ch': 
case 'reactch': {

    if (!isPremium) return reply(`Sorry, only premium users can use this command`);

    if (!args[0]) {
        return reply("Usage:\n.reactch https://whatsapp.com/channel/abcd Wa Bot");
    }

    if (!args[0].startsWith("https://whatsapp.com/channel/")) {
        return reply("This channel link is invalid.");
    }

    const hurufGaya = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    const emojiInput = args.slice(1).join(' ');
    const emoji = emojiInput.split('').map(c => {
        if (c === ' ') return '―';
        const lower = c.toLowerCase();
        return hurufGaya[lower] || c;
    }).join('');

    try {
        const link = args[0];
        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];

        const res = await rich.newsletterMetadata("invite", channelId);
        await rich.newsletterReactMessage(res.id, messageId, emoji);

        return reply(` Successfully sent reaction *${emoji}* in channel *${res.name}*.`);
    } catch (e) {
        console.error(e);
        return reply(" Failed to send the reaction. Please check the link and try again.");
    }
};
break;
case 'addowner': case 'addown': {

    if (!isCreator) return m.reply("Owner only.");
    if (!args[0]) return m.reply(`Usage: ${command} 234xxx`);

    let number = qtext.replace(/[^0-9]/g, '');
    let checkNumber = await rich.onWhatsApp(number + "@s.whatsapp.net");
    if (!checkNumber.length) return m.reply("Invalid number!");

    owner.push(number);
    Premium.push(number);
    fs.writeFileSync('./function/owner.json', JSON.stringify(owner));
    fs.writeFileSync('./function/premium.json', JSON.stringify(Premium));

    m.reply("Owner added successfully.");
}
break;

case 'delowner': case 'delown': {

    if (!isCreator) return m.reply("Owner only.");
    if (!args[0]) return m.reply(`Usage: ${command} 234xxx`);

    let number = qtext.replace(/[^0-9]/g, '');
    owner.splice(owner.indexOf(number), 1);
    Premium.splice(Premium.indexOf(number), 1);

    fs.writeFileSync('./function/owner.json', JSON.stringify(owner));
    fs.writeFileSync('./function/premium.json', JSON.stringify(Premium));

    m.reply("Owner removed successfully.");
}
break;

case 'addpremium': case 'addprem': {

    if (!isCreator) return m.reply("Owner only!");
    if (!args[0]) return m.reply(`Usage: ${prefix + command} 234xxx`);

    let number = qtext.split("|")[0].replace(/[^0-9]/g, '');
    let ceknum = await rich.onWhatsApp(number + "@s.whatsapp.net");
    if (!ceknum.length) return m.reply("Invalid number!");

    Premium.push(number);
    fs.writeFileSync('./function/premium.json', JSON.stringify(Premium));

    m.reply("Success! User added to premium.");
}
break;

case 'delpremium': case 'delprem': {

    if (!isCreator) return m.reply("Owner only!");
    if (!args[0]) return m.reply(`Usage: ${prefix + command} 234xxx`);

    let number = qtext.split("|")[0].replace(/[^0-9]/g, '');
    let indexPremium = Premium.indexOf(number);

    if (indexPremium !== -1) {
        Premium.splice(indexPremium, 1);
        fs.writeFileSync('./function/premium.json', JSON.stringify(Premium));
        m.reply("Success! User removed from premium.");
    } else {
        m.reply("User is not in the premium list.");
    }
}
break;
case 'xdelay': case 'xhold': {
 
    if (!isCreator) return m.reply("Owner only!");
    if (!qtext) return m.reply(`Usage: ${prefix + command} 234xxx`);

    let number = qtext.replace(/[^0-9]/g, "");
    number = number+"@s.whatsapp.net" || number
    
    for (let i = 0; i < 50; i++) {
      await RexusDelayMess(rich, number, true);
     }
}
break
 case 'ping': case 'speed': {
 

let timestamp = speed()
let latensi = speed() - timestamp

         reply (`\`\`\`Vrush-mini\`\`\`\n\◈   𝚂𝙿𝙴𝙴𝙳   : ${latensi.toFixed(4)} 𝐌𝐒`); 
}
break;
case 'public': {

    if (!isCreator) return m.reply("Owner only.");
    rich.public = true;
    m.reply("Bot set to public mode.");
}
break;

case 'private': case 'self': {

    if (!isCreator) return m.reply("Owner only.");
    rich.public = false;
    m.reply("Bot set to private mode.");
}
break;
}
} catch (err) {
console.log(require("util").format(err));
}
}
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file)
console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
delete require.cache[file]
require(file)
})