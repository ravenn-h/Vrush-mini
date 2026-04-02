const chalk = require('chalk')
const fs = require('fs')

// All commands actually present in case.js, organised by category
const menuData = {
  download: {
    icon: '📥',
    label: 'DOWNLOAD',
    cmds: [
      ['tiktok / tt', 'TikTok video'],
      ['ig / instagram', 'Instagram post/reel'],
      ['youtube / yt', 'YouTube video/audio'],
      ['twitter / x', 'Twitter/X video'],
      ['fb / facebook', 'Facebook video'],
      ['apk', 'Download APK'],
    ]
  },
  sticker: {
    icon: '🎭',
    label: 'STICKER',
    cmds: [
      ['sticker / s', 'Image → Sticker'],
      ['take / steal', 'Steal sticker'],
      ['toimg', 'Sticker → Image'],
      ['telestick', 'Telegram sticker'],
      ['gfx → gfx12', 'GFX sticker effects'],
    ]
  },
  audio: {
    icon: '🎵',
    label: 'AUDIO FX',
    cmds: [
      ['bass / blown / deep', 'Bass effects'],
      ['nightcore / reverse', 'Speed effects'],
      ['robot / earrape', 'Voice effects'],
      ['fast / slow / smooth', 'Tempo effects'],
      ['fat / squirrel', 'Pitch effects'],
    ]
  },
  group: {
    icon: '👥',
    label: 'GROUP',
    cmds: [
      ['kick / add', 'Kick or add member'],
      ['promote / demote', 'Change admin'],
      ['mute / unmute', 'Lock/unlock group'],
      ['tagall / hidetag', 'Tag everyone'],
      ['del / delete', 'Delete message'],
      ['linkgc / join', 'Group link'],
      ['left', 'Bot leaves group'],
    ]
  },
  tools: {
    icon: '🛠️',
    label: 'TOOLS',
    cmds: [
      ['ping / speed', 'Bot latency'],
      ['tr', 'Translate text'],
      ['tts / say', 'Text to speech'],
      ['ss / ssweb', 'Screenshot website'],
      ['img', 'Search image'],
      ['tourl', 'File → URL'],
      ['shorturl', 'Shorten URL'],
      ['setpp', 'Set bot profile pic'],
      ['git / gitclone', 'Clone GitHub repo'],
      ['vv / rvo', 'View once bypass'],
      ['quote / qc', 'Random quote'],
      ['bible', 'Bible verse'],
      ['waifu', 'Random waifu image'],
      ['joke', 'Random joke'],
      ['pin / pinterest', 'Pinterest search'],
    ]
  },
  fun: {
    icon: '🎮',
    label: 'FUN',
    cmds: [
      ['tictactoe / ttt', 'Tic-tac-toe game'],
      ['covid', 'COVID-19 stats'],
    ]
  },
  owner: {
    icon: '👑',
    label: 'OWNER',
    cmds: [
      ['public / private', 'Bot mode'],
      ['addowner / delowner', 'Manage owners'],
      ['addprem / delprem', 'Manage premium'],
      ['broadcast / bc', 'Broadcast message'],
      ['block / unblock', 'Block user'],
      ['react-ch', 'React to channel'],
      ['pair / pairsite', 'Pairing info'],
      ['eval', 'Evaluate code'],
    ]
  }
}

// Build the full menu caption (image + text combined in one message)
global.buildMenuCaption = (prefix, m) => {
  const user = m?.pushName || 'User'
  const uptime = (() => {
    const s = Math.floor(process.uptime())
    const h = Math.floor(s / 3600)
    const min = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h}h ${min}m ${sec}s`
  })()

  const header = [
    `⚡ *VRUSH-MINI* ⚡`,
    ``,
    `┌─────────────────────`,
    `│  👤 *User*    : ${user}`,
    `│  ⏱️  *Uptime*  : ${uptime}`,
    `│  🔑 *Prefix*  : [ *${prefix}* ]`,
    `│  📶 *Status*  : 🟢 Active`,
    `└─────────────────────`,
    ``
  ].join('\n')

  const sections = Object.values(menuData).map(cat => {
    const title = `${cat.icon} *${cat.label}*`
    const rows = cat.cmds.map(([cmd, desc]) => `│  *.${cmd}*  — ${desc}`)
    return `┌ ${title}\n${rows.join('\n')}\n└──────────────────`
  }).join('\n\n')

  const footer = `\n\n_© Vrush-mini • RaVenn-h & 04_`

  return header + sections + footer
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})
