ʜᴇʟʟᴏ👋, ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ xʙᴏᴛ ʀᴇᴘᴏsɪᴛᴏʀʏ ɪɴғᴏʀᴍᴀᴛɪᴏɴ. ғᴇᴇʟ ғʀᴇᴇ ᴛᴏ ᴅᴛᴀʀ ᴀɴᴅ ғᴏʀᴋ ᴏᴜʀ ʀᴇᴘᴏ.ᴋᴇɴʏᴀɴ ᴠᴇʀsɪᴏɴ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴇʟᴛᴀʜ ᴛᴇᴄʜ 254 👻."use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) {
    k2 = k;
  }
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) {
    k2 = k;
  }
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) {
    return mod;
  }
  var result = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) {
      __createBinding(result, mod, k);
    }
  }
  __setModuleDefault(result, mod);
  return result;
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const {
  Sticker,
  createSticker,
  StickerTypes
} = require('wa-sticker-formatter');
//import chalk from 'chalk'
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + "/keizzah/keith");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const { antispamFunctions} = require("./bdd/antispam");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
//const //{loadCmd}=require("/keizzah/mesfonctions")
let {
  reagir
} = require(__dirname + "/keizzah/app");
var session = conf.session.replace(/ALPHA-MD;;;=>/g, "");
const prefixe = conf.PREFIXE;
require('dotenv').config({
  'path': "./config.env"
});
async function authentification() {
  try {
    //console.log("le data "+data)
    if (!fs.existsSync(__dirname + "/auth/creds.json")) {
      console.log("connected successfully...");
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
      //console.log(session)
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    }
  } catch (e) {
    console.log("Session Invalid " + e);
    return;
  }
}
authentification();
0;
const store = baileys_1.makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});
setTimeout(() => {
  async function main() {
    0;
    const {
      version,
      isLatest
    } = await baileys_1.fetchLatestBaileysVersion();
    0;
    const {
      state,
      saveCreds
    } = await baileys_1.useMultiFileAuthState(__dirname + "/auth");
    0;
    const sockOptions = {
      version,
      logger: pino({
        level: "silent"
      }),
      browser: ['ALPHA-MD', "safari", "1.0.0"],
      printQRInTerminal: true,
      fireInitQueries: false,
      shouldSyncHistoryMessage: true,
      downloadHistory: true,
      syncFullHistory: true,
      generateHighQualityLinkPreview: true,
      markOnlineOnConnect: false,
      keepAliveIntervalMs: 30_000,
      /* auth: state*/auth: {
        creds: state.creds,
        /** caching makes the store faster to send/recv messages */
        keys: baileys_1.makeCacheableSignalKeyStore(state.keys, logger)
      },
      //////////
      getMessage: async key => {
        if (store) {
          const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
          return msg.message || undefined;
        }
        return {
          conversation: 'An Error Occurred, Repeat Command!'
        };
      }
      ///////
    };

    0;
    const zk = baileys_1.default(sockOptions);
    store.bind(zk.ev);
    setInterval(() => {
      store.writeToFile("store.json");
    }, 3000);
    zk.ev.on("call", async callData => {
      if (conf.ANTICALL === 'yes') {
        const callId = callData[0].id;
        const callerId = callData[0].from;
        await zk.rejectCall(callId, callerId);
        await zk.sendMessage(callerId, {
          text: "```❗📵I AM ALPHA MD | I REJECT THIS CALL BECAUSE MY OWNER IS BUSY.KINDLY SEND TEXT INSTEAD``` ."
        });
      }
    });
    // Function to format notification message
function createNotification(deletedMessage) {
  const deletedBy = deletedMessage.key.participant || deletedMessage.key.remoteJid;
  let notification = `*😈ALPHA ANTIDELETE👿*\n\n`;
  notification += `*Time deleted🥀:* ${new Date().toLocaleString()}\n`;
  notification += `*Deleted by🌷:* @${deletedBy.split('@')[0]}\n\n*Powered by Keithkeizzah*\n\n`;
  return notification;
}

// Helper function to download media
async function downloadMedia(message) {
  try {
    if (message.imageMessage) {
      return await zk.downloadMediaMessage(message.imageMessage);
    } else if (message.videoMessage) {
      return await zk.downloadMediaMessage(message.videoMessage);
    } else if (message.documentMessage) {
      return await zk.downloadMediaMessage(message.documentMessage);
    } else if (message.audioMessage) {
      return await zk.downloadMediaMessage(message.audioMessage);
    } else if (message.stickerMessage) {
      return await zk.downloadMediaMessage(message.stickerMessage);
    } else if (message.voiceMessage) {
      return await zk.downloadMediaMessage(message.voiceMessage);
    } else if (message.gifMessage) {
      return await zk.downloadMediaMessage(message.gifMessage);
    }
  } catch (error) {
    console.error("Error downloading media:", error);
  }
  return null;
}

// Event listener for all incoming messages
zk.ev.on("messages.upsert", async m => {
  // Check if ANTIDELETE is enabled
  if (conf.ADM === "yes") {
    const { messages } = m;
    const ms = messages[0];

    // If the message has no content, ignore
    if (!ms.message) {
      return;
    }

    // Get the message key and remote JID (group or individual)
    const messageKey = ms.key;
    const remoteJid = messageKey.remoteJid;

    // Store message for future undelete reference
    if (!store.chats[remoteJid]) {
      store.chats[remoteJid] = [];
    }

    // Save the received message to storage
    store.chats[remoteJid].push(ms);

    // Handle deleted messages (when protocolMessage is present and type is 0)
    if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
      const deletedKey = ms.message.protocolMessage.key;

      // Search for the deleted message in the stored messages
      const chatMessages = store.chats[remoteJid];
      const deletedMessage = chatMessages.find(msg => msg.key.id === deletedKey.id);

      if (deletedMessage) {
        try {
          // Create notification about the deleted message
          const notification = createNotification(deletedMessage);

          // Check the type of the deleted message (text or media)
          if (deletedMessage.message.conversation) {
            // Text message
            await zk.relayMessage(remoteJid, deletedMessage, {
              caption: notification,
              mentions: [deletedMessage.key.participant]
            });
          } else if (
            deletedMessage.message.imageMessage ||
            deletedMessage.message.videoMessage ||
            deletedMessage.message.documentMessage ||
            deletedMessage.message.audioMessage ||
            deletedMessage.message.stickerMessage ||
            deletedMessage.message.voiceMessage ||
            deletedMessage.message.gifMessage
          ) {
            // Media message (image, video, document, audio, sticker, voice, gif)
            const mediaBuffer = await downloadMedia(deletedMessage.message);
            if (mediaBuffer) {
              let mediaType = 'audio'; // Default to 'audio' if no other match

              // Determine the media type
              if (deletedMessage.message.imageMessage) mediaType = 'image';
              if (deletedMessage.message.videoMessage) mediaType = 'video';
              if (deletedMessage.message.documentMessage) mediaType = 'document';
              if (deletedMessage.message.stickerMessage) mediaType = 'sticker';
              if (deletedMessage.message.voiceMessage) mediaType = 'audio'; // Voice messages are treated as audio
              if (deletedMessage.message.gifMessage) mediaType = 'video'; // GIFs are treated as video

              // Relay the media with notification and participant mention
              await zk.relayMessage(remoteJid, deletedMessage, {
                [mediaType]: mediaBuffer,
                caption: notification,
                mentions: [deletedMessage.key.participant]
              });
            }
          }
        } catch (error) {
          console.error('Error handling deleted message:', error);
        }
      }
    }
  }
});

    // Track contacts that have already received the auto-reply
    let repliedContacts = new Set();
    zk.ev.on("messages.upsert", async m => {
      const {
        messages
      } = m;
      const ms = messages[0];
      if (!ms.message) {
        return;
      }
      const messageText = ms.message.conversation || ms.message.extendedTextMessage?.text || "";
      const remoteJid = ms.key.remoteJid;

      // Get the sender's JID and number
      const sender = ms.key.remoteJid;
      const senderNumber = sender.split('@')[0];

      // Update the auto-reply message dynamically
      auto_reply_message = `Hello @${senderNumber}, A brief departure is on the horizon, but I shall return posthaste. Please bear with me for a fleeting moment, and I’ll rejoin you shortly \n\n*powered by Alpha Md*.`;

      // Check if the message exists and is a command to set a new auto-reply message with any prefix
      if (messageText.match(/^[^\w\s]/) && ms.key.fromMe) {
        const prefix = messageText[0]; // Detect the prefix
        const command = messageText.slice(1).split(" ")[0]; // Command after prefix
        const newMessage = messageText.slice(prefix.length + command.length).trim(); // New message content

        // Update the auto-reply message if the command is 'setautoreply'
        if (command === "setautoreply" && newMessage) {
          auto_reply_message = newMessage;
          await zk.sendMessage(remoteJid, {
            text: `Auto-reply message has been updated to:\n"${auto_reply_message}"`
          });
          return;
        }
      }

      // Check if auto-reply is enabled, contact hasn't received a reply, and it's a private chat
      if (conf.AUTO_REPLY === "yes" && !repliedContacts.has(remoteJid) && !ms.key.fromMe && !remoteJid.includes("@g.us")) {
        await zk.sendMessage(remoteJid, {
          text: auto_reply_message,
          mentions: [sender]
        });

        // Add contact to replied set to prevent repeat replies
        repliedContacts.add(remoteJid);
      }
    });
     // Function to format notification message
function createNotification(deletedMessage) {
  const deletedBy = deletedMessage.key.participant || deletedMessage.key.remoteJid;
  let notification = `*😈ALPHA ANTIDELETE👿*\n\n`;
  notification += `*Time deleted🥀:* ${new Date().toLocaleString()}\n`;
  notification += `*Deleted by🌷:* @${deletedBy.split('@')[0]}\n\n*Powered by Keithkeizzah*\n\n`;
  return notification;
}

// Helper function to download media
async function downloadMedia(message) {
  try {
    if (message.imageMessage) {
      return await zk.downloadMediaMessage(message.imageMessage);
    } else if (message.videoMessage) {
      return await zk.downloadMediaMessage(message.videoMessage);
    } else if (message.documentMessage) {
      return await zk.downloadMediaMessage(message.documentMessage);
    } else if (message.audioMessage) {
      return await zk.downloadMediaMessage(message.audioMessage);
    } else if (message.stickerMessage) {
      return await zk.downloadMediaMessage(message.stickerMessage);
    } else if (message.voiceMessage) {
      return await zk.downloadMediaMessage(message.voiceMessage);
    } else if (message.gifMessage) {
      return await zk.downloadMediaMessage(message.gifMessage);
    }
  } catch (error) {
    console.error("Error downloading media:", error);
  }
  return null;
}

// Event listener for all incoming messages
zk.ev.on("messages.upsert", async m => {
  // Check if ANTIDELETE is enabled
  if (conf.ADM === "yes") {
    const { messages } = m;
    const ms = messages[0];

    // If the message has no content, ignore
    if (!ms.message) {
      return;
    }

    // Get the message key and remote JID (group or individual)
    const messageKey = ms.key;
    const remoteJid = messageKey.remoteJid;

    // Store message for future undelete reference
    if (!store.chats[remoteJid]) {
      store.chats[remoteJid] = [];
    }

    // Save the received message to storage
    store.chats[remoteJid].push(ms);

    // Handle deleted messages (when protocolMessage is present and type is 0)
    if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
      const deletedKey = ms.message.protocolMessage.key;

      // Search for the deleted message in the stored messages
      const chatMessages = store.chats[remoteJid];
      const deletedMessage = chatMessages.find(msg => msg.key.id === deletedKey.id);
      if (deletedMessage) {
        try {
          // Create notification about the deleted message
          const notification = createNotification(deletedMessage);

          // Check the type of the deleted message (text or media)
          if (deletedMessage.message.conversation) {
            // Text message
            await zk.sendMessage(remoteJid, {
              text: notification + `*Message:* ${deletedMessage.message.conversation}`,
              mentions: [deletedMessage.key.participant]
            });
          } else if (
            deletedMessage.message.imageMessage ||
            deletedMessage.message.videoMessage ||
            deletedMessage.message.documentMessage ||
            deletedMessage.message.audioMessage ||
            deletedMessage.message.stickerMessage ||
            deletedMessage.message.voiceMessage ||
            deletedMessage.message.gifMessage
          ) {
            // Media message (image, video, document, audio, sticker, voice, gif)
            const mediaBuffer = await downloadMedia(deletedMessage.message);
            if (mediaBuffer) {
              let mediaType = 'audio'; // Default to 'audio' if no other match

              if (deletedMessage.message.imageMessage) mediaType = 'image';
              if (deletedMessage.message.videoMessage) mediaType = 'video';
              if (deletedMessage.message.documentMessage) mediaType = 'document';
              if (deletedMessage.message.stickerMessage) mediaType = 'sticker';
              if (deletedMessage.message.voiceMessage) mediaType = 'audio'; // Voice messages can be treated as audio
              if (deletedMessage.message.gifMessage) mediaType = 'video'; // GIFs are generally video type

              // Send the media with notification and participant mention
              await zk.sendMessage(remoteJid, {
                [mediaType]: mediaBuffer,
                caption: notification,
                mentions: [deletedMessage.key.participant]
              });
            }
          }
        } catch (error) {
          console.error('Error handling deleted message:', error);
        }
      }
    }
  }
});

// Load the reply messages from the JSON file
const loadReplyMessages = () => {
  try {
    const filePath = path.join(__dirname, 'database', 'chatbot.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading chatbot responses:', error.message);
    return {}; // Return an empty object if there is an error
  }
};

// Track the time of the last response to enforce rate-limiting
let lastReplyTime = 0;

// Define the minimum delay (in milliseconds) between replies (e.g., 5 seconds)
const MIN_REPLY_DELAY = 5000;

// Function to find a matching text reply based on the message
const getReplyMessage = (messageText, replyMessages) => {
  // Convert the message to lowercase and split it into words
  const words = messageText.toLowerCase().split(/\s+/);

  // Check if any of the words match a keyword in the replyMessages object
  for (const word of words) {
    if (replyMessages[word]) {
      return replyMessages[word]; // Return the matching reply
    }
  }

  return null; // Return null if no match is found
};

// Listen for incoming messages when CHAT_BOT is enabled
if (conf.CHAT_BOT === 'yes') {
  console.log('CHAT_BOT is enabled. Listening for messages...');
  
  zk.ev.on('messages.upsert', async (event) => {
    try {
      const { messages } = event;
      
      // Load the replies from the JSON file
      const replyMessages = loadReplyMessages();

      // Iterate over incoming messages
      for (const message of messages) {
        if (!message.key || !message.key.remoteJid) {
          continue; // Skip if there's no remoteJid
        }

        const messageText = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
        const replyMessage = getReplyMessage(messageText, replyMessages);

        // Ensure we don't send replies too frequently
        const currentTime = Date.now();
        if (currentTime - lastReplyTime < MIN_REPLY_DELAY) {
          console.log('Rate limit applied. Skipping reply.');
          continue; // Skip this reply if the delay hasn't passed
        }

        if (replyMessage) {
          try {
            // Send the corresponding text reply
            await zk.sendMessage(message.key.remoteJid, {
              text: replyMessage
            });
            console.log(`Text reply sent: ${replyMessage}`);

            // Update the last reply time
            lastReplyTime = currentTime;
          } catch (error) {
            console.error(`Error sending text reply: ${error.message}`);
          }
        } else {
          console.log('No matching keyword detected. Skipping message.');
        }

        // Wait for a brief moment before processing the next message (3 seconds delay)
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error('Error in message processing:', error.message);
    }
  });
}
// AUTO_REACT: React to messages with random emoji if enabled.
if (conf.AUTO_REACT === "yes") {
  zk.ev.on("messages.upsert", async m => {
    const { messages } = m;

    // Load emojis from the JSON file
    const emojiFilePath = path.resolve(__dirname, 'database', 'emojis.json');
    let emojis = [];
    
    try {
      // Read the emojis from the file
      const data = fs.readFileSync(emojiFilePath, 'utf8');
      emojis = JSON.parse(data); // Parse the JSON data into an array
    } catch (error) {
      console.error('Error reading emojis file:', error);
      return;
    }

    // Process each message
    for (const message of messages) {
      if (!message.key.fromMe) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        // React to the message with a random emoji
        await zk.sendMessage(message.key.remoteJid, {
          react: {
            text: randomEmoji,
            key: message.key
          }
        });
      }
    }
  });
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Track the last reaction time to prevent overflow
let lastReactionTime = 0;

// Array of love emojis to react with
const loveEmojis = ["❤️", "💖", "💘", "💝", "💓", "💌", "💕", "😎", "🔥", "💥", "💯", "✨", "🌟", "🌈", "⚡", "💎", "🌀", "👑", "🎉", "🎊", "🦄", "👽", "🛸", 
  "🚀", "🦋", "💫", "🍀", "🎶", "🎧", "🎸", "🎤", "🏆", "🏅", "🌍", "🌎", "🌏", "🎮", "🎲", "💪", 
  "🏋️", "🥇", "👟", "🏃", "🚴", "🚶", "🏄", "⛷️", "🕶️", "🧳", "🍿", "🍿", "🥂", "🍻", "🍷", "🍸", 
  "🥃", "🍾", "🎯", "⏳", "🎁", "🎈", "🎨", "🌻", "🌸", "🌺", "🌹", "🌼", "🌞", "🌝", "🌜", "🌙", 
  "🌚", "🍀", "🌱", "🍃", "🍂", "🌾", "🐉", "🐍", "🦓", "🦄", "🦋", "🦧", "🦘", "🦨", "🦡", "🐉", 
  "🐅", "🐆", "🐓", "🐢", "🐊", "🐠", "🐟", "🐡", "🦑", "🐙", "🦀", "🐬", "🦕", "🦖", "🐾", "🐕", 
  "🐈", "🐇", "🐾"];

if (conf.AUTO_LIKE_STATUS === "yes") {
    console.log("AUTO_LIKE_STATUS is enabled. Listening for status updates...");

    zk.ev.on("messages.upsert", async (m) => {
        const { messages } = m;

        for (const message of messages) {
            // Check if the message is a status update
            if (message.key && message.key.remoteJid === "status@broadcast") {
                console.log("Detected status update from:", message.key.remoteJid);

                // Ensure throttling by checking the last reaction time
                const now = Date.now();
                if (now - lastReactionTime < 5000) {  // 5-second interval
                    console.log("Throttling reactions to prevent overflow.");
                    continue;
                }

                // Check if bot user ID is available
                const keith = zk.user && zk.user.id ? zk.user.id.split(":")[0] + "@s.whatsapp.net" : null;
                if (!keith) {
                    console.log("Bot's user ID not available. Skipping reaction.");
                    continue;
                }

                // Select a random love emoji
                const randomLoveEmoji = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];

                // React to the status with the selected love emoji
                await zk.sendMessage(message.key.remoteJid, {
                    react: {
                        key: message.key,
                        text: randomLoveEmoji, // Reaction emoji
                    },
                }, {
                    statusJidList: [message.key.participant], // Add other participants if needed
                });

                // Log successful reaction and update the last reaction time
                lastReactionTime = Date.now();
                console.log(`Successfully reacted to status update by ${message.key.remoteJid} with ${randomLoveEmoji}`);

                // Delay to avoid rapid reactions
                await delay(2000); // 2-second delay between reactions
            }
        }
    });
}

    zk.ev.on("messages.upsert", async m => {
      const {
        messages
      } = m;
      const ms = messages[0];
      if (!ms.message) {
        return;
      }
      const decodeJid = jid => {
        if (!jid) {
          return jid;
        }
        if (/:\d+@/gi.test(jid)) {
          0;
          let decode = baileys_1.jidDecode(jid) || {};
          return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else {
          return jid;
        }
      };
      0;
      var mtype = baileys_1.getContentType(ms.message);
      var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttonsResponseMessage" ? ms?.message?.buttonsResponseMessage?.selectedButtonId : mtype == "listResponseMessage" ? ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId : mtype == "messageContextInfo" ? ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text : "";
      var origineMessage = ms.key.remoteJid;
      var idBot = decodeJid(zk.user.id);
      var servBot = idBot.split('@')[0];
      /* const dj='22559763447';
       const dj2='2250143343357';
       const luffy='22891733300'*/
      /*  var superUser=[servBot,dj,dj2,luffy].map((s)=>s.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);
        var dev =[dj,dj2,luffy].map((t)=>t.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);*/
      const verifGroupe = origineMessage?.endsWith("@g.us");
      var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
      var nomGroupe = verifGroupe ? infosGroupe.subject : "";
      var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
      var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
      //ms.message.extendedTextMessage?.contextInfo?.mentionedJid
      // ms.message.extendedTextMessage?.contextInfo?.quotedMessage.
      var auteurMessage = verifGroupe ? ms.key.participant ? ms.key.participant : ms.participant : origineMessage;
      if (ms.key.fromMe) {
        auteurMessage = idBot;
      }
      var membreGroupe = verifGroupe ? ms.key.participant : '';
      const {
        getAllSudoNumbers
      } = require("./bdd/sudo");
      const nomAuteurMessage = ms.pushName;
      const sudo = await getAllSudoNumbers();
      const superUserNumbers = [servBot, "254748387615", '254110190196', '254748387615', "254796299159", '254752925938', conf.NUMERO_OWNER].map(s => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const allAllowedNumbers = superUserNumbers.concat(sudo);
      const superUser = allAllowedNumbers.includes(auteurMessage);
      var dev = ['254110190196', '254748387615', "254796299159", '254752925938'].map(t => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
      function repondre(mes) {
        zk.sendMessage(origineMessage, {
          text: mes
        }, {
          quoted: ms
        });
      }
      console.log("\t [][]...{Alpha-Md}...[][]");
      console.log("=========== New message ===========");
      if (verifGroupe) {
        console.log("message sent from : " + nomGroupe);
      }
      console.log("message from : [" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
      console.log("type of message : " + mtype);
      console.log("------end of your messages ------");
      console.log(texte);
      /**  */
      function groupeAdmin(membreGroupe) {
        let admin = [];
        for (m of membreGroupe) {
          if (m.admin == null) {
            continue;
          }
          admin.push(m.id);
        }
        // else{admin= false;}
        return admin;
      }
      var etat = conf.ETAT;
      if (etat == 1) {
        await zk.sendPresenceUpdate("available", origineMessage);
      } else if (etat == 2) {
        await zk.sendPresenceUpdate("composing", origineMessage);
      } else if (etat == 3) {
        await zk.sendPresenceUpdate("recording", origineMessage);
      } else {
        await zk.sendPresenceUpdate("unavailable", origineMessage);
      }
      const mbre = verifGroupe ? await infosGroupe.participants : '';
      //  const verifAdmin = verifGroupe ? await mbre.filter(v => v.admin !== null).map(v => v.id) : ''
      let admins = verifGroupe ? groupeAdmin(mbre) : '';
      const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
      var verifZokouAdmin = verifGroupe ? admins.includes(idBot) : false;
      /** ** */
      /** ***** */
      const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
      const verifCom = texte ? texte.startsWith(prefixe) : false;
      const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
      const lien = conf.URL.split(',');

      // Utiliser une boucle for...of pour parcourir les liens
      function mybotpic() {
        // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
        // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
        const indiceAleatoire = Math.floor(Math.random() * lien.length);
        // Récupérer le lien correspondant à l'indice aléatoire
        const lienAleatoire = lien[indiceAleatoire];
        return lienAleatoire;
      }
      var commandeOptions = {
        superUser,
        dev,
        verifGroupe,
        mbre,
        membreGroupe,
        verifAdmin,
        infosGroupe,
        nomGroupe,
        auteurMessage,
        nomAuteurMessage,
        idBot,
        verifZokouAdmin,
        prefixe,
        arg,
        repondre,
        mtype,
        groupeAdmin,
        msgRepondu,
        auteurMsgRepondu,
        ms,
        mybotpic
      };
      if (origineMessage === "120363244435092946@g.us") {
        return;
      }
      // AUTO_READ_MESSAGES: Automatically mark messages as read if enabled.
      if (conf.AUTO_READ_MESSAGES === "yes") {
        zk.ev.on("messages.upsert", async m => {
          const {
            messages
          } = m;
          for (const message of messages) {
            if (!message.key.fromMe) {
              await zk.readMessages([message.key]);
            }
          }
        });
      }

      // Handle viewOnce messages
if (ms.message?.viewOnceMessage || ms.message?.viewOnceMessageV2 || ms.message?.viewOnceMessageV2Extension) {
  if (conf.ANTI_VV.toLowerCase() === "yes" && !ms.key.fromMe) {
    const messageContent = ms.message[mtype];

    // Check if the message is an image
    if (messageContent.imageMessage) {
      const imageUrl = await zk.downloadAndSaveMediaMessage(messageContent.imageMessage);
      const imageCaption = messageContent.imageMessage.caption;

      const imageMessage = {
        image: { url: imageUrl },
        caption: imageCaption
      };

      const quotedMessage = { quoted: ms };
      await zk.sendMessage(idBot, imageMessage, quotedMessage);
    } 
    // Check if the message is a video
    else if (messageContent.videoMessage) {
      const videoUrl = await zk.downloadAndSaveMediaMessage(messageContent.videoMessage);
      const videoCaption = messageContent.videoMessage.caption;

      const videoMessage = {
        video: { url: videoUrl },
        caption: videoCaption
      };

      const quotedMessage = { quoted: ms };
      await zk.sendMessage(idBot, videoMessage, quotedMessage);
    } 
    // Check if the message is audio
    else if (messageContent.audioMessage) {
      const audioUrl = await zk.downloadAndSaveMediaMessage(messageContent.audioMessage);

      const audioMessage = {
        audio: { url: audioUrl },
        mymetype: "audio/mp4"
      };

      const quotedMessage = { quoted: ms, ptt: false };
      await zk.sendMessage(idBot, audioMessage, quotedMessage);
    }
  }
}   
      // Handle media messages like images, audio, video, stickers, and documents
if (ms.message?.imageMessage || ms.message?.audioMessage || ms.message?.videoMessage || ms.message?.stickerMessage || ms.message?.documentMessage) {
  let isSpam;

  // Check if antispam data exists in cache
  if (ms.has("antispam")) {
    isSpam = ms.get("antispam").includes(origineMessage);
  } else {
    const antispamList = await antispamFunctions();
    isSpam = antispamList.includes(origineMessage);
    ms.set("antispam", antispamList);
  }

  // If the message is considered spam, handle it
  if (verifGroupe && isSpam && !superUser && !verifAdmin) {
    console.warn("------------------Media------sent--------------------");

    // Retrieve the list of spammers for a given user
    const spamList = spamCache.get(auteurMessage + '_' + origineMessage);
    if (spamList) {
      if (spamList.length >= 4) {
        spamList.push(ms.key);

        // Delete all spam messages from the group
        spamList.forEach(spamKey => {
          const deleteMessage = { delete: spamKey };
          zk.sendMessage(origineMessage, deleteMessage);
        });

        // Remove the user from the group and send a notification
        zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove").then(() => {
          zk.sendMessage(origineMessage, {
            text: '@' + auteurMessage.split('@')[0] + " removed because of spamming in group",
            mentions: [auteurMessage]
          });
        }).catch(err => console.log(err));
      } else {
        // Add the current message to the spam list
        spamList.push(ms.key);
        spamCache.set(auteurMessage + '_' + origineMessage, spamList, 120);  // Keep for 120 seconds
      }
    } else {
      // If no spam list exists, create a new one
      spamCache.set(auteurMessage + '_' + origineMessage, [ms.key]);
    }
  }
}

      /** ****** gestion auto-status  */
      // Auto Read Status - Automatically read status messages
      if (ms.key && ms.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await zk.readMessages([ms.key]);
      }

      // ANTILINK feature: Detect group links and take actions
if (conf.ANTILINK === "yes") {
  zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;
    const ms = messages[0];
    if (!ms.message) {
      return;
    }

    // Extract message content
    const texte = ms.message.conversation || ms.message.extendedTextMessage?.text || "";
    const messageKey = ms.key;
    const remoteJid = messageKey.remoteJid;

    // Ensure there is a chat history to store the message
    if (!store.chats[remoteJid]) {
      store.chats[remoteJid] = [];
    }
    store.chats[remoteJid].push(ms);

    // Check if the message contains a WhatsApp group link
    if (texte.includes("chat.whatsapp.com") && !conf.superUser.includes(ms.key.participant) &&
      conf.verifAdmin && !conf.groupeAdmin.includes(ms.key.participant) && ms.key.remoteJid.includes("@g.us")) {

      // Respond to the message
      repondre("_Group link detected_");

      const participant = ms.key.participant || ms.key.remoteJid;
      const chatId = ms.key.remoteJid;

      // Delete the message with the group link
      await zk.sendMessage(chatId, {
        delete: {
          remoteJid: chatId,
          fromMe: false,
          id: ms.key.id,
          participant: participant,
        }
      });

      // Remove the participant who sent the link
      await zk.groupParticipantsUpdate(chatId, [participant], 'remove');

      // Notify the group about the participant removal
      await zk.sendMessage(chatId, {
        text: `Removed!\n\n@${participant.split("@")[0]} sending group links is prohibited!`,
        contextInfo: {
          mentionedJid: [participant]
        }
      }, {
        quoted: ms
      });
    }
  });
}

      // Auto Download and Forward Status - Download and send status messages to a bot
      if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        try {
          if (ms.message.extendedTextMessage) {
            const stTxt = ms.message.extendedTextMessage.text;
            await zk.sendMessage(idBot, {
              text: stTxt
            }, {
              quoted: ms
            });
          } else if (ms.message.imageMessage) {
            const stMsg = ms.message.imageMessage.caption || "No caption";
            const stImg = await zk.downloadAndSaveMediaMessage(ms.message.imageMessage);
            await zk.sendMessage(idBot, {
              image: {
                url: stImg
              },
              caption: stMsg
            }, {
              quoted: ms
            });
          } else if (ms.message.videoMessage) {
            const stMsg = ms.message.videoMessage.caption || "No caption";
            const stVideo = await zk.downloadAndSaveMediaMessage(ms.message.videoMessage);
            await zk.sendMessage(idBot, {
              video: {
                url: stVideo
              },
              caption: stMsg
            }, {
              quoted: ms
            });
          }
        } catch (error) {
          console.error("Error in downloading or sending status:", error);
        }
      }

      // Check to prevent action on specific message origin
      if (!dev && origineMessage === "120363158701337904@g.us") {
        return;
      }

      //---------------------------------------rang-count--------------------------------
      if (texte && auteurMessage.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData
        } = require("./bdd/level");
        try {
          await ajouterOuMettreAJourUserData(auteurMessage);
        } catch (e) {
          console.error(e);
        }
      }

      /////////////////////////////   Mentions /////////////////////////////////////////

      try {
        if (ms.message[mtype].contextInfo.mentionedJid && (ms.message[mtype].contextInfo.mentionedJid.includes(idBot) || ms.message[mtype].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net')) /*texte.includes(idBot.split('@')[0]) || texte.includes(conf.NUMERO_OWNER)*/) {
          if (origineMessage == "120363158701337904@g.us") {
            return;
          }
          ;
          if (superUser) {
            console.log('hummm');
            return;
          }
          let mbd = require('./bdd/mention');
          let alldata = await mbd.recupererToutesLesValeurs();
          let data = alldata[0];
          if (data.status === 'non') {
            console.log('mention pas actifs');
            return;
          }
          let msg;
          if (data.type.toLocaleLowerCase() === 'image') {
            msg = {
              image: {
                url: data.url
              },
              caption: data.message
            };
          } else if (data.type.toLocaleLowerCase() === 'video') {
            msg = {
              video: {
                url: data.url
              },
              caption: data.message
            };
          } else if (data.type.toLocaleLowerCase() === 'sticker') {
            let stickerMess = new Sticker(data.url, {
              pack: conf.NOM_OWNER,
              type: StickerTypes.FULL,
              categories: ["🤩", "🎉"],
              id: "12345",
              quality: 70,
              background: "transparent"
            });
            const stickerBuffer2 = await stickerMess.toBuffer();
            msg = {
              sticker: stickerBuffer2
            };
          } else if (data.type.toLocaleLowerCase() === 'audio') {
            msg = {
              audio: {
                url: data.url
              },
              mimetype: 'audio/mp4'
            };
          }
          zk.sendMessage(origineMessage, msg, {
            quoted: ms
          });
        }
      } catch (error) {}
      try {
        const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
        const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
        if (botMsg || baileysMsg) {
          if (mtype === 'reactionMessage') {
            console.log('Je ne reagis pas au reactions');
            return;
          }
          ;
          const antibotactiver = await atbverifierEtatJid(origineMessage);
          if (!antibotactiver) {
            return;
          }
          ;
          if (verifAdmin || auteurMessage === idBot) {
            console.log('je fais rien');
            return;
          }
          ;
          const key = {
            remoteJid: origineMessage,
            fromMe: false,
            id: ms.key.id,
            participant: auteurMessage
          };
          var txt = "bot detected, \n";
          // txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;

          var sticker = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            pack: 'Alpha-Md',
            author: conf.OWNER_NAME,
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 50,
            background: '#000000'
          });
          await sticker.toFile("st1.webp");
          // var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
          var action = await atbrecupererActionJid(origineMessage);
          if (action === 'remove') {
            txt += `message deleted \n @${auteurMessage.split("@")[0]} removed from group.`;
            await zk.sendMessage(origineMessage, {
              sticker: fs.readFileSync("st1.webp")
            });
            0;
            baileys_1.delay(800);
            await zk.sendMessage(origineMessage, {
              text: txt,
              mentions: [auteurMessage]
            }, {
              quoted: ms
            });
            try {
              await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
            } catch (e) {
              console.log("antibot ") + e;
            }
            await zk.sendMessage(origineMessage, {
              delete: key
            });
            await fs.unlink("st1.webp");
          } else if (action === 'delete') {
            txt += `message delete \n @${auteurMessage.split("@")[0]} Avoid sending link.`;
            //await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
            await zk.sendMessage(origineMessage, {
              text: txt,
              mentions: [auteurMessage]
            }, {
              quoted: ms
            });
            await zk.sendMessage(origineMessage, {
              delete: key
            });
            await fs.unlink("st1.webp");
          } else if (action === 'warn') {
            const {
              getWarnCountByJID,
              ajouterUtilisateurAvecWarnCount
            } = require('./bdd/warn');
            let warn = await getWarnCountByJID(auteurMessage);
            let warnlimit = conf.WARN_COUNT;
            if (warn >= warnlimit) {
              await zk.sendMessage(origineMessage, {
                text: `bot detected ;you will be remove because of reaching warn-limit`,
                mentions: [auteurMessage]
              }, {
                quoted: ms
              });
              await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
              await zk.sendMessage(origineMessage, {
                delete: key
              });
            } else {
              var rest = warnlimit - warn;
              await ajouterUtilisateurAvecWarnCount(auteurMessage);
              await zk.sendMessage(origineMessage, {
                text: `bot detected , your warn_count was upgrade ;\n rest : ${rest} `,
                mentions: [auteurMessage]
              }, {
                quoted: ms
              });
              await zk.sendMessage(origineMessage, {
                delete: key
              });
            }
          }
        }
      } catch (er) {
        console.log('.... ' + er);
      }

      /////////////////////////

      //execution des commandes   
      if (verifCom) {
        const cd = evt.cm.find(keith => keith.nomCom === com || keith.nomCom === com || keith.aliases && keith.aliases.includes(com));
        if (cd) {
          try {
            if (conf.MODE.toLocaleLowerCase() != 'yes' && !superUser) {
              return;
            }

            /******************* PM_PERMT***************/

            if (!superUser && origineMessage === auteurMessage && conf.PM_PERMIT === "yes") {
              repondre("SORRY!! ❌\n\nYou don't have acces to commands here idiot");
              return;
            }
            ///////////////////////////////

            /*****************************banGroup  */
            if (!superUser && verifGroupe) {
              let req = await isGroupBanned(origineMessage);
              if (req) {
                return;
              }
            }

            /***************************  ONLY-ADMIN  */

            if (!verifAdmin && verifGroupe) {
              let req = await isGroupOnlyAdmin(origineMessage);
              if (req) {
                return;
              }
            }

            /**********************banuser */

            if (!superUser) {
              let req = await isUserBanned(auteurMessage);
              if (req) {
                repondre("You are banned from bot commands");
                return;
              }
            }
            reagir(origineMessage, zk, ms, cd.reaction);
            cd.fonction(origineMessage, zk, commandeOptions);
          } catch (e) {
            console.log("😡😡 " + e);
            zk.sendMessage(origineMessage, {
              text: "😡😡 " + e
            }, {
              quoted: ms
            });
          }
        }
      }
      //fin exécution commandes
    });
    //fin événement message

    /******** evenement groupe update ****************/
    const {
      recupevents
    } = require('./bdd/welcome');
    zk.ev.on('group-participants.update', async group => {
      console.log(group);
      let ppgroup;
      try {
        ppgroup = await zk.profilePictureUrl(group.id, 'image');
      } catch {
        ppgroup = 'https://ibb.co/7SKY0tg';
      }
      try {
        const metadata = await zk.groupMetadata(group.id);
        if (group.action == 'add' && (await recupevents(group.id, "welcome")) == 'on') {
          let msg = `👋 Hello
`;
          let membres = group.participants;
          for (let membre of membres) {
            msg += ` *@${membre.split("@")[0]}* Welcome to Our Official Group,`;
          }
          msg += `You might want to read the group Description to avoid getting removed...`;
          zk.sendMessage(group.id, {
            image: {
              url: ppgroup
            },
            caption: msg,
            mentions: membres
          });
        } else if (group.action == 'remove' && (await recupevents(group.id, "goodbye")) == 'on') {
          let msg = `one or somes member(s) left group;\n`;
          let membres = group.participants;
          for (let membre of membres) {
            msg += `@${membre.split("@")[0]}\n`;
          }
          zk.sendMessage(group.id, {
            text: msg,
            mentions: membres
          });
        } else if (group.action == 'promote' && (await recupevents(group.id, "antipromote")) == 'on') {
          //  console.log(zk.user.id)
          if (group.author == metadata.owner || group.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) {
            console.log('Cas de superUser je fais rien');
            return;
          }
          ;
          await zk.groupParticipantsUpdate(group.id, [group.author, group.participants[0]], "demote");
          zk.sendMessage(group.id, {
            text: `@${group.author.split("@")[0]} has violated the anti-promotion rule, therefore both ${group.author.split("@")[0]} and @${group.participants[0].split("@")[0]} have been removed from administrative rights.`,
            mentions: [group.author, group.participants[0]]
          });
        } else if (group.action == 'demote' && (await recupevents(group.id, "antidemote")) == 'on') {
          if (group.author == metadata.owner || group.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) {
            console.log('Cas de superUser je fais rien');
            return;
          }
          ;
          await zk.groupParticipantsUpdate(group.id, [group.author], "demote");
          await zk.groupParticipantsUpdate(group.id, [group.participants[0]], "promote");
          zk.sendMessage(group.id, {
            text: `@${group.author.split("@")[0]} has violated the anti-demotion rule by removing @${group.participants[0].split("@")[0]}. Consequently, he has been stripped of administrative rights.`,
            mentions: [group.author, group.participants[0]]
          });
        }
      } catch (e) {
        console.error(e);
      }
    });

    /******** fin d'evenement groupe update *************************/

    /*****************************Cron setup */

    async function activateCrons() {
      const cron = require('node-cron');
      const {
        getCron
      } = require('./bdd/cron');
      let crons = await getCron();
      console.log(crons);
      if (crons.length > 0) {
        for (let i = 0; i < crons.length; i++) {
          if (crons[i].mute_at != null) {
            let set = crons[i].mute_at.split(':');
            console.log(`etablissement d'un automute pour ${crons[i].group_id} a ${set[0]} H ${set[1]}`);
            cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
              await zk.groupSettingUpdate(crons[i].group_id, 'announcement');
              zk.sendMessage(crons[i].group_id, {
                image: {
                  url: './media/chrono.webp'
                },
                caption: "Hello, it's time to close the group; sayonara."
              });
            }, {
              timezone: "Africa/Nairobi"
            });
          }
          if (crons[i].unmute_at != null) {
            let set = crons[i].unmute_at.split(':');
            console.log(`etablissement d'un autounmute pour ${set[0]} H ${set[1]} `);
            cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
              await zk.groupSettingUpdate(crons[i].group_id, 'not_announcement');
              zk.sendMessage(crons[i].group_id, {
                image: {
                  url: './media/chrono.webp'
                },
                caption: "Good morning; It's time to open the group."
              });
            }, {
              timezone: "Africa/Nairobi"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }

    //événement contact
    zk.ev.on("contacts.upsert", async contacts => {
      const insertContact = newContact => {
        for (const contact of newContact) {
          if (store.contacts[contact.id]) {
            Object.assign(store.contacts[contact.id], contact);
          } else {
            store.contacts[contact.id] = contact;
          }
        }
        return;
      };
      insertContact(contacts);
    });
    //fin événement contact 
    //événement connexion
    zk.ev.on("connection.update", async con => {
      const {
        lastDisconnect,
        connection
      } = con;
      if (connection === "connecting") {
        console.log("ℹ️ Alpha md connecting in your account...");
      } else if (connection === 'open') {
        await zk.groupAcceptInvite("DvXonepPp1XBPOYIBziTl1");
        console.log("✅ Alpha Md connected successfully✔");
        console.log("--");
        0;
        await baileys_1.delay(200);
        console.log("------");
        0;
        await baileys_1.delay(300);
        console.log("------------------/-----");
        console.log(" Alpha-md installing ${evt.cm.length} plugins😇\n\n");
        //chargement des commandes 
        console.log("chargement des commands ...\n");
        fs.readdirSync(__dirname + "/commands").forEach(fichier => {
          if (path.extname(fichier).toLowerCase() == ".js") {
            try {
              require(__dirname + "/commands/" + fichier);
              console.log(fichier + "Successfully installed Alpha Md commands✔️");
            } catch (e) {
              console.log(`${fichier} n'a pas pu être chargé pour les raisons suivantes : ${e}`);
            } /* require(__dirname + "/commands/" + fichier);
              console.log(fichier + " installé ✔️")*/
            0;
            baileys_1.delay(300);
          }
        });
        0;
        baileys_1.delay(700);
        var md;
        if (conf.MODE.toLocaleLowerCase() === "yes") {
          md = "public";
        } else if (conf.MODE.toLocaleLowerCase() === "no") {
          md = "private";
        } else {
          md = "undefined";
        }
        console.log("Alpha md successfully connected✅");
        await activateCrons();
        if (conf.DP.toLowerCase() === 'yes') {
          await zk.sendMessage(zk.user.id, {
            text: `╭════⊷
║ *『𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 𝐢𝐬 𝐎𝐧𝐥𝐢𝐧𝐞』*
║    Creator: *keithkeizzah*
║    Prefix : [  ${prefixe} ]
║    Mode : ${md} mode
║    Total Commands : ${evt.cm.length}
╰═════════════════⊷

╭───◇
┃
┃ *Thank you for choosing*                      
┃  *ALPHA-MD*
> Regards keithkeizzah 
╰═════════════════⊷ `
          });
        }
      } else if (connection == "close") {
        let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
        if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
          console.log('Wrong session Id format, rescan again...');
        } else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
          console.log('!!! connexion fermée, reconnexion en cours ...');
          main();
        } else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
          console.log('connection error😞 ,,Alpha trying to reconnect... ');
          main();
        } else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
          console.log('connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!');
        } else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
          console.log('session disconnected,,, replace a new session id');
        } else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
          console.log('redémarrage en cours ▶️');
          main();
        } else {
          console.log("redemarrage sur le coup de l'erreur  ", raisonDeconnexion);
          //repondre("* Redémarrage du bot en cour ...*");

          const {
            exec
          } = require("child_process");
          exec("pm2 restart all");
        }
        // sleep(50000)
        console.log("hum " + connection);
        main(); //console.log(session)
      }
    });
    //fin événement connexion
    //événement authentification 
    zk.ev.on("creds.update", saveCreds);
    //fin événement authentification 
    //
    /** ************* */
    //fonctions utiles
    zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
      let quoted = message.msg ? message.msg : message;
      let mime = (message.msg || message).mimetype || '';
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
      0;
      const stream = await baileys_1.downloadContentFromMessage(quoted, messageType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      let type = await FileType.fromBuffer(buffer);
      let trueFileName = './' + filename + '.' + type.ext;
      // save to file
      await fs.writeFileSync(trueFileName, buffer);
      return trueFileName;
    };
    zk.awaitForMessage = async (options = {}) => {
      return new Promise((resolve, reject) => {
        if (typeof options !== 'object') {
          reject(new Error('Options must be an object'));
        }
        if (typeof options.sender !== 'string') {
          reject(new Error('Sender must be a string'));
        }
        if (typeof options.chatJid !== 'string') {
          reject(new Error('ChatJid must be a string'));
        }
        if (options.timeout && typeof options.timeout !== 'number') {
          reject(new Error('Timeout must be a number'));
        }
        if (options.filter && typeof options.filter !== 'function') {
          reject(new Error('Filter must be a function'));
        }
        const timeout = options?.timeout || undefined;
        const filter = options?.filter || (() => true);
        let interval = undefined;

        /**
         * 
         * @param {{messages: Baileys.proto.IWebMessageInfo[], type: Baileys.MessageUpsertType}} data 
         */
        let listener = data => {
          let {
            type,
            messages
          } = data;
          if (type == "notify") {
            for (let message of messages) {
              const fromMe = message.key.fromMe;
              const chatId = message.key.remoteJid;
              const isGroup = chatId.endsWith('@g.us');
              const isStatus = chatId == 'status@broadcast';
              const sender = fromMe ? zk.user.id.replace(/:.*@/g, '@') : isGroup || isStatus ? message.key.participant.replace(/:.*@/g, '@') : chatId;
              if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                zk.ev.off('messages.upsert', listener);
                clearTimeout(interval);
                resolve(message);
              }
            }
          }
        };
        zk.ev.on('messages.upsert', listener);
        if (timeout) {
          interval = setTimeout(() => {
            zk.ev.off('messages.upsert', listener);
            reject(new Error('Timeout'));
          }, timeout);
        }
      });
    };

    // fin fonctions utiles
    /** ************* */
    return zk;
  }
  let fichier = require.resolve(__filename);
  fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
  });
  main();
}, 5000);