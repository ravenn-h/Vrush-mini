const chalk = require('chalk')
const fs = require('fs')

const formatMenu = (title, items) => {
  const lines = items.map(item => `├ ${item}`)
  return `╭──『 *${title.toUpperCase()}* 』\n${lines.join('\n')}\n╰───────────❒`
}

const menuData = {
  'general': [
    'poll', 'brat', 'sticker', 'tourl', 'vv', 'take/steal',
    'play', 'gitclone', 'tts/say', 'device', 'hd/remini',
    'img', 'ss/ssweb', 'imbd', 'animedl', 'block', 'unblock',
    'fact', 'setpp', 'tr', 'setppgroup', 'google',
    'pickupline', 'shorturl', 'reportbug', 'coffee', 'createlogo'
  ],
  'group': [
    'hidetag', 'tagall', 'demote', 'promote', 'mute', 'unmute',
    'join', 'poll', 'kick', 'left', 'add', 'linkgc', 'groupjid',
    'getpp', 'kickall', 'everyone', 'resetlink', 'totag',
    'closetime', 'opentime'
  ],
  'download': [
    'hd/remini', 'apk', 'play', 'img', 'imbd', 'animedl',
    'tiktok', 'gitclone', 'toimg', 'ytsearch',
    'tiktokgirl', 'tiktoksantuy', 'tiktoksexy', 'tiktokbocil',
    'tiktokghea', 'tiktokkayes', 'tiktokpanrika', 'tiktoknot',
    'xnxxsearch', 'coffee', 'idch'
  ],
  'anime': [
    'nwaifu', 'waifu', 'nsfw', 'animekill', 'animelick',
    'animebite', 'animeglomp', 'animehappy', 'animedance',
    'animeringe', 'animehighfive', 'animepoke', 'animewink',
    'animesmile', 'animesmug', 'animewlp', 'animesearch', 'animeavatar'
  ],
  'sticker': [
    'take', 'brat', 'cry', 'kill', 'hug', 'happy', 'dance',
    'handhold', 'highfive', 'slap', 'kiss', 'blush', 'bite',
    'cuddle', 'furbrat', 'shinobu', 'bonk', 'pat', 'nom'
  ],
  'ephoto': [
    'glitchtext', 'writetext', 'advancedglow', 'typographytext',
    'pixelglitch', 'neonglitch', 'flagtext', 'flag3dtext',
    'deletingtext', 'blackpinkstyle', 'glowingtext', 'underwatertext',
    'logomakerl', 'cartoonstyle', 'papercutstyle', 'watercolortext',
    'effectclouds', 'blackpinklogo', 'gradienttext', 'summerbeach',
    'mluxurygold', 'multicoloredneon', 'sandsummer', 'galaxywallpaper',
    '1917style', 'lmakingneon', 'royaltext', 'freecreate',
    'galaxystyle', 'lighteffects', 'logoneko'
  ],
  'new': [
    'pair', 'delpair', 'ai', 'joke', 'truth', 'dare',
    'qc', 'zaddy', 'gptimage', 'tovn'
  ],
  'owner': [
    'self', 'public', 'addowner', 'delowner', 'getcase',
    'addprem', 'delprem', 'backup', 'restart', 'del/delete',
    'block', 'unblock', 'buyscript', 'repo', 'owner', 'setbio'
  ],
  'other': [
    'device', 'ss/ssweb', 'broadcastimage', 'broadcasttext',
    'broadcastvid', 'ban', 'unban', 'jid', 'vv',
    'weather', 'fact', 'createlogo', 'shorturl', 'reportbug'
  ],
  'bug': ['fc-group', 'force', 'delay'],
  'fun': ['tictactoe']
}

// m is now passed as parameter — no more dependency on a global m
global.allxmenu = (prefix, m) => {
  const categories = Object.keys(menuData).map(k => `├ ${prefix}menu ${k}`)
  return `╭──『 *MAIN MENU* 』
${categories.join('\n')}
╰───────────❒

> 𖥔 ︳ʜᴇʟʟᴏ : ${m?.pushName || 'User'}
> 𖥔 ︳ʙᴏᴛ : ${botname}
> 𖥔 ︳sᴛᴀᴛᴜs : active ✅
> 𖥔 ︳ᴏᴡɴᴇʀ : ${ownername}
> 𖥔 ︳ᴠᴇʀsɪᴏɴ : v.1

_Vrush-mini | RaVenn-h | 04_`
}

global.menuall = (prefix, m) => {
  const allSections = Object.keys(menuData)
    .map(key => formatMenu(key, menuData[key].map(cmd => `${prefix}${cmd}`)))
    .join('\n\n')
  return `> 𖥔 ︳ʜᴇʟʟᴏ : ${m?.pushName || 'User'}
> 𖥔 ︳ʙᴏᴛ ɴᴀᴍᴇ : ${botname}
> 𖥔 ︳ᴏᴡɴᴇʀ : ${ownername}
> 𖥔 ︳ᴜsᴇʀ : @${m?.sender?.split('@')[0]}
> 𖥔 ︳ᴠᴇʀsɪᴏɴ : v.1

${allSections}

_Vrush-mini | RaVenn-h | 04_`
}

global.animemenu   = (prefix) => formatMenu('anime',    menuData['anime'].map(cmd => `${prefix}${cmd}`))
global.ownermenu   = (prefix) => formatMenu('owner',    menuData['owner'].map(cmd => `${prefix}${cmd}`))
global.othermenu   = (prefix) => formatMenu('other',    menuData['other'].map(cmd => `${prefix}${cmd}`))
global.downloadmenu= (prefix) => formatMenu('download', menuData['download'].map(cmd => `${prefix}${cmd}`))
global.groupmenu   = (prefix) => formatMenu('group',    menuData['group'].map(cmd => `${prefix}${cmd}`))
global.stickermenu = (prefix) => formatMenu('sticker',  menuData['sticker'].map(cmd => `${prefix}${cmd}`))
global.ephotomenu  = (prefix) => formatMenu('ephoto',   menuData['ephoto'].map(cmd => `${prefix}${cmd}`))
global.bugmenu     = (prefix) => formatMenu('bug',      menuData['bug'].map(cmd => `${prefix}${cmd}`))
global.funmenu     = (prefix) => formatMenu('fun',      menuData['fun'].map(cmd => `${prefix}${cmd}`))
global.newmenu     = (prefix) => formatMenu('new',      menuData['new'].map(cmd => `${prefix}${cmd}`))
global.generalmenu = (prefix) => formatMenu('general',  menuData['general'].map(cmd => `${prefix}${cmd}`))
global.gameenu     = (prefix) => formatMenu('game', [])

// Map category name → global function
global.menuCategoryMap = (prefix, cat) => {
  const map = {
    general:  global.generalmenu(prefix),
    group:    global.groupmenu(prefix),
    download: global.downloadmenu(prefix),
    anime:    global.animemenu(prefix),
    sticker:  global.stickermenu(prefix),
    ephoto:   global.ephotomenu(prefix),
    new:      global.newmenu(prefix),
    owner:    global.ownermenu(prefix),
    other:    global.othermenu(prefix),
    bug:      global.bugmenu(prefix),
    fun:      global.funmenu(prefix),
  }
  return map[cat] || null
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})
