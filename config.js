const fs = require('fs')

global.owner = ['2250101676111']
global.xprefix = '.'
global.gambar = "https://files.catbox.moe/zhbsht.jpg"
global.OWNER_NAME = "RaVenn-h"
global.DEVELOPER = ["2250101676111"]
global.BOT_NAME = "Vrush-mini"
global.bankowner = "RaVenn-h"
global.creatorName = "RaVenn-h"
global.ownernumber = '2250101676111'
global.location = "Unknown"
global.prefa = ['','!','.','#','&']
//================DO NOT CHANGE OR YOU'LL GET AN ERROR=============\
global.footer = "𝗩𝗿𝘂𝘀𝗵-𝗺𝗶𝗻𝗶" //footer section
global.link = "https://whatsapp.com/channel/0029VbB3x7IIyPtU0Sa3163f"
global.autobio = true //auto update bio
global.botName = "𝗩𝗿𝘂𝘀𝗵-𝗺𝗶𝗻𝗶 ⚡"
global.version = "𝗺𝗶𝗻𝗶"
global.botname = "𝗩𝗿𝘂𝘀𝗵"
global.author = "𝗥𝗮𝗩𝗲𝗻𝗻-𝗵"
global.themeemoji = '⚡'
global.wagc = 'https://chat.whatsapp.com/GXhZqm2fSRID2XITi98sat'
global.thumbnail = 'https://files.catbox.moe/y074ky.jpg'
global.richpp = ' '
global.packname = "Sticker By Vrush"
global.author = "\n\n\nCreated by Vrush-mini"
global.creator = "2250101676111@s.whatsapp.net"
global.ownername = '𝗥𝗮𝗩𝗲𝗻𝗻-𝗵'
global.onlyowner = `𝘴𝘰𝘳𝘳𝘺 𝘰𝘯𝘭𝘺 𝘧𝘰𝘳 𝘰𝘸𝘯𝘦𝘳`
  // reply 
global.database = `𝘊𝘰𝘯𝘵𝘢𝘤𝘵 𝗥𝗮𝗩𝗲𝗻𝗻-𝗵 𝘵𝘰 𝘢𝘤𝘤𝘦𝘴𝘴 𝘵𝘩𝘦 𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦`
  global.mess = {
wait: "```Working on it....```",
   success: "Success",
   on: "𝗩𝗿𝘂𝘀𝗵-𝗺𝗶𝗻𝗶 Active", 
   prem: "FOR PREMIUM USERS ONLY. CONTACT RaVenn-h TO GET ACCESS.", 
   off: "Vrush-mini off",
   query: {
       text: "Where's the text?",
       link: "Where's the link?",
   },
   error: {
       fitur: "Sorry, this feature has an error. Please contact the Bot Developer.",
   },
   only: {
       group: "Sorry, this feature can only be used in Groups",
       private: "Sorry, this feature can only be used in Private Chats",
       owner: "Sorry, this feature is Owner only",
       admin: "Sorry, this feature can only be used by Bot Admins",
       badmin: "Sorry, the bot needs to be Group Admin to use this feature",
       premium: "This feature is for Premium users only",
   }
}

global.hituet = 0
//false=disable and true=enable
global.autoRecording = true //auto recording
global.autoTyping = true //auto typing
global.autorecordtype = true //auto typing + recording
global.autoread = false //auto read messages
global.autobio = true //auto update bio
global.anti92 = true //auto block +92 
global.autoswview = true //auto view status/story

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
