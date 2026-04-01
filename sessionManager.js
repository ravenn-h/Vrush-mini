/* SESSION MANAGER FOR AUTO LIK3, BY YOUR ONE AND ONLY ~KUNLE SAN~ */
const activeSessions = new Map();

function addSession(number, session) {
  activeSessions.set(number, {
    session,
    connected: true,
    lastActivity: Date.now()
  });
}

function removeSession(number) {
  activeSessions.delete(number);
}

function updateSessionStatus(number, connected) {
  const sessionData = activeSessions.get(number);
  if (sessionData) {
    sessionData.connected = connected;
    sessionData.lastActivity = Date.now();
  }
}

function getAllSessions() {
  const validSessions = [];
  for (const [number, data] of activeSessions.entries()) {
    if (data.connected) {
      validSessions.push([number, data.session]);
    }
  }
  return validSessions;
}

function getSessionCount() {
  return getAllSessions().length;
}

function getSessionByNumber(number) {
  const data = activeSessions.get(number);
  return data && data.connected ? data.session : null;
}

// Clean up disconnected sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [number, data] of activeSessions.entries()) {
    if (!data.connected && (now - data.lastActivity) > 300000) { // 5 minutes
      activeSessions.delete(number);
    }
  }
}, 60000); // Check every minute

module.exports = {
  addSession,
  removeSession,
  updateSessionStatus,
  getAllSessions,
  getSessionCount,
  getSessionByNumber
};