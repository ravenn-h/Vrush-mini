const express = require("express");
const session = require("express-session");
const startpairing = require("./pair");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const { autoLoadPairs } = require('./autoload'); // adjust path if needed
const app = express();
app.set("json spaces", 2);
const PORT = process.env.PORT || 5000;
let isShuttingDown = false;
let isAutoLoadRunning = false;

// Paths
const pairedNumbersPath = path.join(__dirname, "./sesFolder/pairedNumbers.json");
const pairingCodePath = path.join(__dirname, "./store/pairing/pairing.json");
const usersPath = path.join(__dirname, "./store/users.json");

app.use(session({
  secret: "vrush_mini_secret_key",
  resave: false,
  saveUninitialized: true,
}));

// Auto-load functionality
const runAutoLoad = async () => {
  if (isAutoLoadRunning || isShuttingDown) return;
  isAutoLoadRunning = true;

  try {
    console.log('⏱️ INITIATING AUTO-LOAD');
    await autoLoadPairs();
    console.log('✅ AUTO-LOAD COMPLETED');
  } catch (e) {
    console.error('❌ AUTO-LOAD FAILED:', e);
  } finally {
    isAutoLoadRunning = false;
  }
};

const startAutoLoadLoop = () => {
  runAutoLoad();
  setInterval(runAutoLoad, 1 * 60 * 1000);
};
startAutoLoadLoop()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend"), {
  index: false
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
let currentPairingNumber = null;
const { getAllSessions } = require('./sessionManager');
// Secret KEYY
const REACT_SECRET_KEY = "VRUSH_REACT_KEY";
// Create pairedNumbers file if not exists
if (!fs.existsSync(pairedNumbersPath)) {
  fs.writeFileSync(pairedNumbersPath, JSON.stringify({ numbers: [] }, null, 2));
}

if (!fs.existsSync(usersPath)) {
  fs.writeFileSync(usersPath, JSON.stringify({ users: [] }, null, 2));
} 

function saveNumber(number) {
  const clean = number.replace(/@s\.whatsapp\.net$/i, "");
  let list = { numbers: [] };

  try {
    if (fs.existsSync(pairedNumbersPath)) {
      list = JSON.parse(fs.readFileSync(pairedNumbersPath, "utf8"));
    }
  } catch {
    list = { numbers: [] };
  }

  if (!list.numbers.includes(clean)) {
    list.numbers.push(clean);
    fs.writeFileSync(pairedNumbersPath, JSON.stringify(list, null, 2));
  }
}

function requireLogin(req, res, next) {
  if (req.session.loggedIn) return next();
  return res.redirect("/login.html");
}

function loadUsers() {
  try {
    const fileData = fs.readFileSync(usersPath, "utf8");
    const parsed = JSON.parse(fileData);
    return parsed.users || [];
  } catch (err) {
    console.error("❌ Failed to load users:", err.message);
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify({ users }, null, 2));
}

function getCurrentUser(req) {
  if (!req.session.loggedIn || !req.session.username) return null;
  const users = loadUsers();
  return users.find(u => u.username === req.session.username);
}

function requireAdmin(req, res, next) {
  if (req.session.loggedIn && req.session.username === "vrush_admin") return next();
  return res.redirect("/adminlogin.html");
}

app.get("/admin", requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "admin.html"));
});

// Admin data route - FIXED PAGINATION ISSUE
app.get("/admin-data", requireAdmin, (req, res) => {
  let users = [];
  let paired = [];

  try {
    users = loadUsers();
  } catch (err) {
    console.warn("Failed to load users.json:", err.message);
  }

  try {
    const file = fs.readFileSync(pairedNumbersPath, "utf8");
    paired = JSON.parse(file).numbers || [];
  } catch (err) {
    console.warn("Failed to load pairedNumbers.json:", err.message);
  }

  // Handle pagination if requested
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  res.json({ 
    users: paginatedUsers, 
    paired,
    totalUsers: users.length,
    page,
    limit,
    totalPages: Math.ceil(users.length / limit)
  });
});

// Add admin access to react endpoint
app.get("/admin/react", requireAdmin, async (req, res) => {
  try {
    const { channelmsglink, emoji = "❤️", timeout = 30000 } = req.query;
    
    if (!channelmsglink) {
      return res.status(400).json({ 
        success: false, 
        message: "channelmsglink parameter is required" 
      });
    }

    // Extract the invite code from the URL
    const inviteCode = channelmsglink.split('https://whatsapp.com/channel/')[1];
    if (!inviteCode) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid channel link format" 
      });
    }

    // Extract message ID (assuming format: inviteCode/messageId)
    const parts = inviteCode.split('/');
    const cleanInviteCode = parts[0];
    const messageId = parts[1];

    if (!messageId) {
      return res.status(400).json({ 
        success: false, 
        message: "Message ID not found in URL" 
      });
    }

    // Get all active sessions
    const sessions = getAllSessions();
    
    if (sessions.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "No active sessions available" 
      });
    }

    // Use the first session to get newsletter metadata
    const [firstNumber, firstSession] = sessions[0];
    let newsletterId;

    try {
      console.log(`Getting newsletter metadata for invite code: ${cleanInviteCode}`);
      
      // Get the actual newsletter ID using newsletterMetadata
      const metadata = await firstSession.newsletterMetadata("invite", cleanInviteCode);
      newsletterId = metadata.id;
      
      console.log(`Found newsletter: ${metadata.name} (ID: ${newsletterId})`);
      
    } catch (metadataError) {
      console.error("Failed to get newsletter metadata:", metadataError);
      return res.status(400).json({ 
        success: false, 
        message: "Invalid newsletter invite code: " + metadataError.message 
      });
    }

    console.log(`Starting autolike with ${sessions.length} sessions for newsletter ${newsletterId}, message ${messageId}`);

    const results = [];
    const promises = [];

    // Create promises for each reaction with timeout
    for (const [number, session] of sessions) {
      const promise = (async () => {
        try {
          console.log(`Reacting with session: ${number}`);
          
          // Add timeout to each reaction request
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Reaction timeout")), 10000)
          );
          
          // Use the CORRECT newsletter ID format
          const reactionPromise = session.newsletterMsg(
            newsletterId, // Use the actual newsletter ID, not invite code
            { 
              react: emoji, 
              id: messageId 
            }
          );
          
          const result = await Promise.race([reactionPromise, timeoutPromise]);
          
          return {
            number: number.replace(/@s\.whatsapp\.net$/i, ""),
            status: "success",
            message: `Reacted with ${emoji}`
          };
          
        } catch (error) {
          return {
            number: number.replace(/@s\.whatsapp\.net$/i, ""),
            status: "failed",
            message: error.message || "Unknown error"
          };
        }
      })();
      
      promises.push(promise);
      
      // Add delay between starting requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Wait for all reactions to complete
    const allResults = await Promise.all(promises);
    
    const successCount = allResults.filter(r => r.status === "success").length;
    const failCount = allResults.filter(r => r.status === "failed").length;

    const response = {
      success: true,
      message: `Reacted with ${successCount}/${sessions.length} sessions`,
      summary: {
        totalSessions: sessions.length,
        successful: successCount,
        failed: failCount,
        successRate: Math.round((successCount / sessions.length) * 100)
      },
      target: {
        newsletterId: newsletterId,
        messageId: messageId,
        emoji: emoji,
        inviteCode: cleanInviteCode
      },
      details: allResults
    };

    console.log(`Autolike completed: ${response.message}`);
    res.json(response);

  } catch (error) {
    console.error("Autolike error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
});

// Add admin access to idch endpoint
app.get("/admin/idch", requireAdmin, async (req, res) => {
  const { inviteCode } = req.query;
  
  if (!inviteCode) {
    return res.status(400).json({ success: false, message: "Invite code required" });
  }
  
  const sessions = getAllSessions();
  if (sessions.length === 0) {
    return res.status(400).json({ success: false, message: "No active sessions" });
  }
  
  const [number, session] = sessions[0];
  
  try {
    const metadata = await session.newsletterMetadata("invite", inviteCode);
    
    res.json({
      success: true,
      metadata: {
        id: metadata.id,
        name: metadata.name,
        description: metadata.description,
        subscribers: metadata.subscribers,
        state: metadata.state,
        verification: metadata.verification,
        creationTime: metadata.creationTime
      },
      inviteCode: inviteCode,
      sessionUsed: number
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get newsletter info: " + error.message,
      inviteCode: inviteCode
    });
  }
});

// Add admin access to session status endpoint
app.get("/admin/ses-status", requireAdmin, async (req, res) => {
  const sessions = getAllSessions();
  const sessionList = sessions.map(([number, session]) => ({
    number: number.replace(/@s\.whatsapp\.net$/i, ""),
    status: "active"
  }));
  
  res.json({
    success: true,
    totalSessions: sessions.length,
    sessions: sessionList
  });
});

// Delete user (admin only)
app.delete("/admin/users/:username", requireAdmin, (req, res) => {
  const username = req.params.username;
  let users = loadUsers();
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  // Remove user's pairings from paired list
  const paired = JSON.parse(fs.readFileSync(pairedNumbersPath, "utf8"));
  const updatedPairs = paired.numbers.filter(n => !user.pairings.includes(n));
  fs.writeFileSync(pairedNumbersPath, JSON.stringify({ numbers: updatedPairs }, null, 2));

  // Remove user session folders
  user.pairings.forEach(number => {
    const sessionPath = path.join(__dirname, `./store/pairing/${number}`);
    if (fs.existsSync(sessionPath)) {
      fs.rmSync(sessionPath, { recursive: true, force: true });
    }
  });

  // Remove user
  users = users.filter(u => u.username !== username);
  saveUsers(users);

  res.json({ success: true, message: `${username} deleted.` });
});


// Autolike ENDPOINT by kunle :-)
app.get("/react", async (req, res) => {
  try {
    const { channelmsglink, emoji = "❤️", secret, timeout = 30000 } = req.query;
    
    // Validate secret key immediately
    if (secret !== REACT_SECRET_KEY) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid secret key" 
      });
    }
    
    if (!channelmsglink) {
      return res.status(400).json({ 
        success: false, 
        message: "channelmsglink parameter is required" 
      });
    }

    // Extract the invite code from the URL FIRST
    const inviteCode = channelmsglink.split('https://whatsapp.com/channel/')[1];
    if (!inviteCode) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid channel link format" 
      });
    }

    // Extract message ID
    const parts = inviteCode.split('/');
    const cleanInviteCode = parts[0];
    const messageId = parts[1];

    if (!messageId) {
      return res.status(400).json({ 
        success: false, 
        message: "Message ID not found in URL" 
      });
    }

    // Get all active sessions
    const sessions = getAllSessions();
    
    if (sessions.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "No active sessions available" 
      });
    }

    // NOW send the immediate response
    res.set('Connection', 'close');
    res.status(202).json({ 
      success: true, 
      message: "Reaction process started. Processing in background.",
      status: "processing",
      totalSessions: sessions.length,
      newsletterInviteCode: cleanInviteCode,
      messageId: messageId
    });

    // Use the first session to get newsletter metadata
    const [firstNumber, firstSession] = sessions[0];
    let newsletterId;

    try {
      console.log(`Getting newsletter metadata for invite code: ${cleanInviteCode}`);
      
      const metadata = await firstSession.newsletterMetadata("invite", cleanInviteCode);
      newsletterId = metadata.id;
      
      console.log(`Found newsletter: ${metadata.name} (ID: ${newsletterId})`);
      
    } catch (metadataError) {
      console.error("Failed to get newsletter metadata:", metadataError);
      return; // Just return since we already sent response
    }

    console.log(`Starting autolike with ${sessions.length} sessions for newsletter ${newsletterId}, message ${messageId}`);

    // Process reactions in parallel with controlled concurrency
    const MAX_CONCURRENT = 5;
    const results = [];
    
    const processBatch = async (batch) => {
      const batchPromises = batch.map(async ([number, session]) => {
        try {
          const cleanNumber = number.replace(/@s\.whatsapp\.net$/i, "");
          console.log(`Reacting with session: ${cleanNumber}`);
          
          const reactionPromise = session.newsletterMsg(
            newsletterId,
            { 
              react: emoji, 
              id: messageId 
            }
          );
          
          // Add timeout to each reaction
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Reaction timeout (10s)")), 10000)
          );
          
          await Promise.race([reactionPromise, timeoutPromise]);
          
          return {
            number: cleanNumber,
            status: "success",
            message: `Reacted with ${emoji}`
          };
          
        } catch (error) {
          return {
            number: number.replace(/@s\.whatsapp\.net$/i, ""),
            status: "failed",
            message: error.message || "Unknown error"
          };
        }
      });
      
      return Promise.all(batchPromises);
    };

    // Process in batches
    for (let i = 0; i < sessions.length; i += MAX_CONCURRENT) {
      const batch = sessions.slice(i, i + MAX_CONCURRENT);
      const batchResults = await processBatch(batch);
      results.push(...batchResults);
      
      // Small delay between batches
      if (i + MAX_CONCURRENT < sessions.length) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    const successCount = results.filter(r => r.status === "success").length;
    const failCount = results.filter(r => r.status === "failed").length;

    console.log(`✅ Autolike completed: ${successCount}/${sessions.length} successful reactions`);

  } catch (error) {
    console.error("❌ Autolike error:", error);
  }
});

app.get("/idch", async (req, res) => {
  const { inviteCode } = req.query;
  
  if (!inviteCode) {
    return res.status(400).json({ success: false, message: "Invite code required" });
  }
  
  const sessions = getAllSessions();
  if (sessions.length === 0) {
    return res.status(400).json({ success: false, message: "No active sessions" });
  }
  
  const [number, session] = sessions[0];
  
  try {
    const metadata = await session.newsletterMetadata("invite", inviteCode);
    
    res.json({
      success: true,
      metadata: {
        id: metadata.id,
        name: metadata.name,
        description: metadata.description,
        subscribers: metadata.subscribers,
        state: metadata.state,
        verification: metadata.verification,
        creationTime: metadata.creationTime
      },
      inviteCode: inviteCode,
      sessionUsed: number
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get newsletter info: " + error.message,
      inviteCode: inviteCode
    });
  }
});

// Add a status endpoint to check active sessions
app.get("/ses-status", async (req, res) => {
  const { secret } = req.query;
  
  if (secret !== REACT_SECRET_KEY) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid secret key" 
    });
  }
  
  const sessions = getAllSessions();
  const sessionList = sessions.map(([number, session]) => ({
    number: number.replace(/@s\.whatsapp\.net$/i, ""),
    status: "active"
  }));
  
  res.json({
    success: true,
    totalSessions: sessions.length,
    sessions: sessionList
  });
});

// Delete any paired users
app.delete("/admin/pairs/:number", requireAdmin, (req, res) => {
  const number = req.params.number;

  const paired = JSON.parse(fs.readFileSync(pairedNumbersPath, "utf8"));
  const updated = paired.numbers.filter(n => n !== number);
  fs.writeFileSync(pairedNumbersPath, JSON.stringify({ numbers: updated }, null, 2));

  // Remove from all users
  let users = loadUsers();
  users.forEach(u => {
    u.pairings = (u.pairings || []).filter(p => p !== number);
  });
  saveUsers(users);

  const folder = path.join(__dirname, `./store/pairing/${number}`);
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
  }

  res.json({ success: true, message: `Pair ${number} removed.` });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "All fields required." });
  }

  const users = loadUsers();
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(409).json({ success: false, message: "Username already exists." });
  }

  users.push({ username, password, pairings: [] });
  saveUsers(users);

  req.session.loggedIn = true;
  req.session.username = username;
  return res.json({ success: true, message: "Account created." });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "vrush_admin" && password === "vrush_admin") {
  req.session.loggedIn = true;
  req.session.username = "vrush_admin";
  return res.json({ success: true });
}

  const users = loadUsers();
  const match = users.find(u => u.username === username && u.password === password);

  if (match) {
    req.session.loggedIn = true;
    req.session.username = username;
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials." });
  }
});

app.get("/pair", async (req, res) => {
  let number = req.query.number;
  if (!number) return res.status(400).send("Phone number is required");
  if (!req.session.loggedIn || !req.session.username) return res.status(401).send("Login required");

  number = number.replace(/\s+/g, "");
  number = number.replace(/^\+/, "");
  
  // only digits
  if (!/^\d+$/.test(number)) {
    return res.status(400).send("Phone number must contain only digits");
  }

  if (number.length < 11 || number.length > 15) {
    return res.status(400).send("Phone number must include country code (e.g. 2349012834275)");
  }

  const users = loadUsers();
  const user = users.find(u => u.username === req.session.username);
  if (!user) return res.status(401).send("User not found");

  if (!user.pairings) user.pairings = [];

  if (user.pairings.includes(number)) {
    return res.status(409).send("Number already paired for this user.");
  }

  if (user.pairings.length >= 2) {
    return res.status(403).send("You've reached the maximum of 2 paired numbers.");
  }

  currentPairingNumber = number;

  try {
    await startpairing(number);
    saveNumber(number);

    user.pairings.push(number);
    saveUsers(users);

    currentPairingNumber = number;
    res.send("Pairing has started. Check /pairing-code.");
  } catch (e) {
    console.error("❌ Pairing error:", e);
    res.status(500).send("Pairing failed. Reason: " + e.message);
  }
});

app.get("/pairing-code", (req, res) => {
  try {
    if (fs.existsSync(pairingCodePath)) {
      const codeData = JSON.parse(fs.readFileSync(pairingCodePath, "utf8"));
      res.json({ code: codeData.code, number: currentPairingNumber });
    } else {
      res.status(404).json({ error: "Pairing code not yet available" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error reading pairing code" });
  }
});

app.get("/paired", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(pairedNumbersPath, "utf8"));
    res.json({ numbers: data.numbers });
  } catch {
    res.status(500).json({ error: "Could not load paired numbers." });
  }
});

app.delete("/paired/:number", async (req, res) => {
  const numberToDelete = req.params.number;

  try {
    const pairedNumbers = JSON.parse(fs.readFileSync(pairedNumbersPath, "utf-8"));
    const updatedList = { numbers: pairedNumbers.numbers.filter(n => n !== numberToDelete) };
    fs.writeFileSync(pairedNumbersPath, JSON.stringify(updatedList, null, 2));

    const users = loadUsers();
    const user = users.find(u => u.username === req.session.username);
    if (user && user.pairings) {
      user.pairings = user.pairings.filter(n => n !== numberToDelete);
      saveUsers(users);
    }

    const sessionFolder = path.join(__dirname, `./store/pairing/${numberToDelete}`);
    if (fs.existsSync(sessionFolder)) {
      fs.rmSync(sessionFolder, { recursive: true, force: true });
    }

    res.json({ status: true, message: `Deleted ${numberToDelete} successfully.` });
  } catch (err) {
    console.error("Error deleting pair:", err);
    res.status(500).json({ status: false, message: "Failed to delete pair." });
  }
});

app.get("/dashboard", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dashboard.html"));
});

app.get("/", (req, res) => {
  res.redirect("/login.html");
});

app.get("/reload-user", (req, res) => {
  const { username, number } = req.query;

  if (!username || !number) {
    return res.status(400).send("Missing username or number.");
  }

  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user || !user.pairings.includes(number)) {
    return res.status(404).send("User or number not found.");
  }

  startpairing(number)
    .then(() => res.send(`✅ Reloaded pairing for ${number}`))
    .catch(err => {
      console.error("❌ Reloading failed:", err);
      res.status(500).send("Reloading failed.");
    });
});

app.get("/me", (req, res) => {
  if (!req.session.loggedIn || !req.session.username) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  const users = loadUsers();
  const user = users.find(u => u.username === req.session.username);

  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  res.json({
    username: user.username,
    pairings: user.pairings || []
  });
});

app.get("/createuser", (req, res) => {
  const { username, key, secret } = req.query;
  if (secret !== "VRUSH_KEY") return res.status(401).json({ success: false, message: "Unauthorized secret" });

  const users = loadUsers();
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(409).json({ success: false, message: "Username already exists." });
  }

  users.push({ username, password: key, pairings: [] });
  saveUsers(users);

  return res.json({ success: true, message: "User created successfully." });
});

app.get("/home", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`✅ Vrush-mini Server is running on port ${PORT}`);

  try {
    // Fetch public IP
    const ipRes = await axios.get('https://api.ipify.org?format=json');
    const ip = ipRes.data.ip;

    console.log(`🌐 Public Access URL: http://${ip}:${PORT}`);
    console.log(`- Login Page:       http://${ip}:${PORT}/login.html`);
    console.log(`- Dashboard Page:   http://${ip}:${PORT}/dashboard`);
  } catch (err) {
    console.log("⚠️ Couldn't fetch public IP. Use your server panel IP manually.");
  }
  await autoLoadPairs({ concurrent: false, batchSize: 100 });
})
// Error handling
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);