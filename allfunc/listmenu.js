const chalk = require('chalk')
const fs = require('fs')

const menuData = {
  download: {
    label: 'DOWNLOAD',
    cmds: ['tiktok / tt', 'ig / instagram', 'youtube / yt', 'twitter / x', 'fb / facebook', 'apk']
  },
  sticker: {
    label: 'STICKER',
    cmds: ['sticker / s', 'take / steal', 'toimg', 'telestick', 'gfx → gfx12']
  },
  audio: {
    label: 'AUDIO FX',
    cmds: ['bass / blown / deep', 'nightcore / reverse', 'robot / earrape', 'fast / slow / smooth', 'fat / squirrel']
  },
  group: {
    label: 'GROUP',
    cmds: ['kick / add', 'promote / demote', 'mute / unmute', 'tagall / hidetag', 'del / delete', 'linkgc / join', 'left']
  },
  tools: {
    label: 'TOOLS',
    cmds: ['ping / speed', 'tr', 'tts / say', 'ss / ssweb', 'img', 'tourl', 'shorturl', 'setpp', 'git / gitclone', 'vv / rvo', 'quote / qc', 'bible', 'waifu', 'joke', 'pin / pinterest']
  },
  fun: {
    label: 'FUN',
    cmds: ['tictactoe / ttt', 'covid']
  },
  owner: {
    label: 'OWNER',
    cmds: ['public / private', 'addowner / delowner', 'addprem / delprem', 'broadcast / bc', 'block / unblock', 'react-ch', 'pair / pairsite', 'eval']
  }
}

global.buildMenuCaption = (prefix, m) => {
  const user = m?.pushName || 'User'

  const s = Math.floor(process.uptime())
  const h = Math.floor(s / 3600)
  const min = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const uptime = `${h}h ${min}m ${sec}s`

  const header = [
    `> 𖥔 ︳ʜᴇʟʟᴏ : ${user}`,
    `> 𖥔 ︳ʙᴏᴛ : 𝗩𝗿𝘂𝘀𝗵`,
    `> 𖥔 ︳sᴛᴀᴛᴜs : active ✅`,
    `> 𖥔 ︳ᴏᴡɴᴇʀ : 𝗥𝗮𝗩𝗲𝗻𝗻-𝗵`,
    `> 𖥔 ︳ᴠᴇʀsɪᴏɴ : v.1`,
    `> 𖥔 ︳ᴘʀᴇꜰɪx : [ *${prefix}* ]`,
    `> 𖥔 ︳ᴜᴘᴛɪᴍᴇ : ${uptime}`
  ].join('\n')

  const sections = Object.values(menuData).map(cat => {
    const rows = cat.cmds.map(cmd => `├ *${cmd}*`)
    return `╭──『 *${cat.label}* 』\n${rows.join('\n')}\n╰───────────❒`
  }).join('\n\n')

  const footer = `_Vrush-mini | RaVenn-h | 04_`

  return `${header}\n${sections}\n\n${footer}`
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})
