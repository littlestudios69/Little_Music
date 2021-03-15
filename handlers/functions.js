const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const emoji = require("../botconfig/emojis.json");
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
const radios = JSON.parse(require("fs").readFileSync(__dirname + "/../botconfig/radiostations.json"));
const ms = require("ms")
module.exports = {
  getMember: function(message, toFind = "") {
    try{
      toFind = toFind.toLowerCase();
      let target = message.guild.members.get(toFind);
      if (!target && message.mentions.members) target = message.mentions.members.first();
      if (!target && toFind) {
        target = message.guild.members.find((member) => {
          return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
        });
      }
      if (!target) target = message.member;
      return target;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  shuffle: function(a) {
    try{
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
      }
      return a;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  formatDate: function(date) {
    try{
      return new Intl.DateTimeFormat("en-US").format(date);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  duration: function(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (60 * 1000)) % 60).toString();
      const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
      const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
      return `${days}Days,${hrs}Hours,${min}Minutes,${sec}Seconds`;
  },
  promptMessage: async function(message, author, time, validReactions) {
    try{
      time *= 1000;
      for (const reaction of validReactions) await message.react(reaction);
      const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
      return message.awaitReactions(filter, {
        max: 1,
        time: time
      }).then((collected) => collected.first() && collected.first().emoji.name);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  delay: function(delayInms) {
    try{
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //randomnumber between 0 and x
  getRandomInt: function(max) {
    try{
      return Math.floor(Math.random() * Math.floor(max));
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //random number between y and x
  getRandomNum: function(min, max) {
    try{
      return Math.floor(Math.random() * Math.floor((max - min) + min));
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  createBar: function(player) {
    /*  OLD CREATE BAR WAY

    try{
      //player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", config.settings.progressbar_emoji)
      if (!player.queue.current) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
      let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
      let total = player.queue.current.duration;
      let size = 25;
      let line = "▬";
      let slider = config.settings.progressbar_emoji;
      let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
      if (!String(bar).includes(config.settings.progressbar_emoji)) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
      return `**[${bar[0]}]**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }*/

    /* NEW WAY*/
    try{
      if (!player.queue.current) return `**${emoji.msg.progress_bar.leftindicator}${emoji.msg.progress_bar.filledframe}${emoji.msg.progress_bar.emptyframe.repeat(size - 1)}${emoji.msg.progress_bar.rightindicator}**\n**00:00:00 / 00:00:00**`;
      let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
      let total = player.queue.current.duration;
      let size = 15;
      let bar = String(emoji.msg.progress_bar.leftindicator) + String(emoji.msg.progress_bar.filledframe).repeat(Math.round(size * (current / total))) + String(emoji.msg.progress_bar.emptyframe).repeat(size - Math.round(size * (current / total))) + String(emoji.msg.progress_bar.rightindicator);
      return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }


    /* CUSTOM WAY
    try{
    // EMOJIS.JSON
      // "progress_bar": {
      //  "leftindicator": "<:progressbar_left_filled:818558865268408341>",
      //  "rightindicator": "<:progressbar_right_filled:818558865540907038>",
      //
      //  "emptyframe": "<:progressbar_middle_unfilled:818558865532649503>",
      //  "filledframe": "<:progressbar_middle_filled:818558865595564062>",
      //
      //  "emptybeginning": "<:progressbar_left_filled_hal:818558865628725298>",
      //  "emptyend": "<:progressbar_right_unfilled:818558865619681300>"
      // }

      if (!player.queue.current) return `**${emoji.msg.progress_bar.emptybeginning}${emoji.msg.progress_bar.filledframe}${emoji.msg.progress_bar.emptyframe.repeat(size - 1)}${emoji.msg.progress_bar.emptyend}**\n**00:00:00 / 00:00:00**`;
      let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
      let total = player.queue.current.duration;
      let size = 15;
      let rightside = size - Math.round(size * (current / total));
      let leftside  = Math.round(size * (current / total));
      let bar;
      if(leftside < 1 ) bar = String(emoji.msg.progress_bar.emptybeginning) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(emoji.msg.progress_bar.emptyend);
      else bar = String(emoji.msg.progress_bar.leftindicator) + String(emoji.msg.progress_bar.filledframe).repeat(leftside) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(size - rightside !== 1 ? emoji.msg.progress_bar.emptyend : emoji.msg.progress_bar.rightindicator);
      return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
    */

  },
  format: function(millis) {
    try{
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  stations: async function(client, prefix, message) {
    try{
      let num = 0
     let found = false
     let flags = {
       "United_Kingdom":"🇬🇧",
       "Austria":"🇦🇹",
       "Belgium":"🇧🇪",
       "Bosnia":"🇧🇦",
       "Czech":"🇨🇿",
       "Denmark":"🇩🇰",
       "Germany":"🇩🇪",
       "Hungary":"🇭🇺",
       "Ireland":"🇮🇪",
       "Italy":"🇮🇹",
       "Luxembourg":"🇱🇺",
       "Romania":"🇷🇴",
       "Serbia":"🇷🇸",
       "Spain":"🇪🇸",
       "Sweden":"🇸🇪",
       "Ukraine":"🇺🇦",
       "OTHERS":"🧾"
     }
     let embeds = []
     for (var prop in radios.EU) {
      let msg = ``
      let embed = new Discord.MessageEmbed()

      .setTitle(`**${flags[prop]? flags[prop] : flags.OTHERS} ${prop.replace("_"," ")}**`)
     await radios.EU[prop].forEach(el => {
       num++
      msg += `> **${num}** \`${el.split(` `)[0]}\`\n`
     });
     embed
     .setDescription(`__To Play a Station use \`m!radio <number>\`!__\n\n${msg}`)
     .setColor(ee.color)
     .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")
     .setFooter(ee.footertext, ee.footericon)
     embeds.push(embed)
    }
    
    for (var prop2 in radios.OTHERS) {
      let msg = ``
      let embed = new Discord.MessageEmbed()

      .setTitle(`**${flags[prop]? flags[prop] : flags.OTHERS} ${prop.replace("_"," ")}**`)
    await radios.OTHERS[prop2].forEach(el => {
      num++
      msg += `> **${num}** \`${el.split(` `)[0]}\`\n`
      
    });
    embed
     .setDescription(`__To Play a Station use \`m!radio <number>\`!__\n\n${msg}`)
     .setColor(ee.color)
     .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")
     .setFooter(ee.footertext, ee.footericon)
     embeds.push(embed)
    }
    return embeds
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  databasing: function(client, guildid, userid) {
    try{
      client.stats.ensure("global", {
        commands: 0,
        songs: 0,
        setups: 0
      });
      client.premium.ensure("premiumlist", {
        list: [{
          "u": "XXXYYYXXXYYYXXXYYY"
        }, {
          "g": "XXXYYYXXXYYYXXXYYY"
        }]
      })
      if (guildid) {
        client.stats.ensure(guildid, {
          commands: 0,
          songs: 0
        });
        client.premium.ensure(guildid, {
          enabled: false,
        })
        client.setups.ensure(guildid, {
          textchannel: "0",
          voicechannel: "0",
          category: "0",
          message_cmd_info: "0",
          message_queue_info: "0",
          message_track_info: "0"
        });
        client.settings.ensure(guildid, {
          prefix: config.prefix,
          pruning: true,
          requestonly: true,
          djroles: [],
          djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
          botchannel: [],
        });
      }
      if (userid) {
        client.premium.ensure(userid, {
          enabled: false,
        })
        client.queuesaves.ensure(userid, {
          "TEMPLATEQUEUEINFORMATION" : ["queue", "sadasd"]
        });
      }
      if(userid && guildid){
        client.userProfiles.ensure(userid, {
            id: userid,
            guild: guildid,
            totalActions: 0,
            warnings: [],
            kicks: []
        });
      }
      return;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  escapeRegex: function(str) {
    try{
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  autoplay: async function(client, player, type) {
    try{
      if (player.queue.length > 0) return;
      const previoustrack = player.get("previoustrack");
      if (!previoustrack) return;

      const mixURL = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
      const response = await client.manager.search(mixURL, previoustrack.requester);
      //if nothing is found, send error message, plus if there  is a delay for the empty QUEUE send error message TOO
      if (!response || response.loadType === 'LOAD_FAILED' || response.loadType !== 'PLAYLIST_LOADED') {
        let embed = new MessageEmbed()
          .setTitle("❌ Error | Found nothing related for the latest Song!")
          .setDescription(config.settings.LeaveOnEmpty_Queue.enabled && type != "skip" ? `I'll leave the Channel: ${client.channels.cache.get(player.voiceChannel).name} in: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}, If the Queue stays Empty! ` : `I left the Channel: ${client.channels.cache.get(player.voiceChannel).name} because the Queue was empty for: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}`)
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon);
        client.channels.cache.get(player.textChannel).send(embed);
        if (config.settings.LeaveOnEmpty_Queue.enabled && type != "skip") {
          return setTimeout(() => {
            try {
              player = client.manager.players.get(player.guild);
              if (player.queue.size === 0) {
                let embed = new MessageEmbed()
                try {
                  embed.setTitle("❌ Queue has ended.")
                } catch {}
                try {
                  embed.setDescription(`I left the Channel: ${client.channels.cache.get(player.voiceChannel).name} because the Queue was empty for: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}`)
                } catch {}
                try {
                  embed.setColor(ee.wrongcolor)
                } catch {}
                try {
                  embed.setFooter(ee.footertext, ee.footericon);
                } catch {}
                client.channels.cache
                  .get(player.textChannel)
                  .send(embed)
                try {
                  client.channels.cache
                    .get(player.textChannel)
                    .messages.fetch(player.get("playermessage")).then(msg => {
                    try{
                     msg.delete({timeout: 7500}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                    }catch{ /* */ }
                  });
                } catch (e) {
                  console.log(String(e.stack).yellow);
                }
                player.destroy();
              }
            } catch (e) {
              console.log(String(e.stack).yellow);
            }
          }, config.settings.LeaveOnEmpty_Queue.time_delay);
        } else {
          player.destroy();
        }
      }
      player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
      return player.play();
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  arrayMove: function(array, from, to) {
    try{
      array = [...array];
      const startIndex = from < 0 ? array.length + from : from;
      if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to;
        const [item] = array.splice(from, 1);
        array.splice(endIndex, 0, item);
      }
      return array;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  isrequestchannel: function(client, message) {
    try{
      //get the setup channel from the database
      if (client.setups.get(message.guild.id, "textchannel") !== "0") {
        //get the channel from the database channelid data
        let channel = message.guild.channels.cache.get(client.setups.get(message.guild.id, "textchannel"));
        //if the channel is undefined aka not existing reset the database
        if (!channel) {
          return false;
        }
        //if its in the request channel do this
        if (channel.id === message.channel.id) {
          return true;
        } else {
          return false;
        }
      }
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  edit_request_message_track_info: async function(client, player, track) {
    try{
      let message = player.get("message");
      let db = client.setups.get(message.guild.id);

      function SongEmbed(track) {
        let embed = new MessageEmbed()
        try {
          embed.setTitle("Playing :notes: **`" + track.title + "`**")
        } catch {}
        try {
          embed.setURL(track.uri)
        } catch {}
        try {
          embed.setColor(ee.color)
        } catch {}
        try {
          embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)
        } catch {}
        try {
          embed.addField("⌛️ Duration: ", `${track.isStream ? "LIVE STREAM" : format(track.duration)}`, true)
        } catch {}
        try {
          embed.addField("💯 Song By: ", `${track.author}`, true)
        } catch {}
        try {
          embed.addField("🔊 Volume", `${player.volume}%`, true)
        } catch {}
        try {
          embed.addField(`${emoji.msg.autoplay_mode} Autoplay:`, `${player.get("autoplay") ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)
        } catch {}
        try {
          embed.addField(`${player.queueRepeat ? `${emoji.msg.repeat_mode} Queue Loop: ` : `${emoji.msg.repeat_mode} Song Loop: `}`, `${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)
        } catch {}
        try {
          embed.addField(`${emoji.msg.pause_resume}  State`, `${player.playing ? `${emoji.msg.resume}  Playing Song` : `${emoji.msg.pause}  Paused Song`}`, true)
        } catch {}
        try {
          embed.addField(`${emoji.msg.time} Progress: `, createBar(player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, `▬`, config.settings.progressbar_emoji) )
        } catch {}
        try {
          embed.setFooter(`Requested by: ${track.requester.tag} | Updates every Trackupdate or 20 Seconds!`, track.requester.displayAvatarURL({
            dynamic: true
          }));
        } catch {}
        return embed;
      }

      function QueueEmbed(client, player) {
        const queue = player.queue;
        const embed = new MessageEmbed().setAuthor(`Little Music | Music Queue`);
        const multiple = 15;
        const page = 1;
        const end = page * multiple;
        const start = end - multiple;
        const tracks = queue.slice(start, end);
        if (queue.current) embed.addField("**0) CURRENT TRACK**", `**${queue.current.title.substr(0, 60)}** - ${track.isStream ? "LIVE STREAM" : format(track.duration)}\n*request by: ${queue.current.requester.tag}*`);
        if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else embed.setDescription(tracks.map((track, i) => `**${start + ++i})** **${track.title.substr(0, 60)}** - ${track.isStream ? "LIVE STREAM" : format(track.duration)}\n*request by: ${track.requester.tag}*`).join("\n"));
        embed.setColor(ee.color);
        embed.setFooter(ee.footertext, ee.footericon);
        return embed;
      }

      function format(millis) {
        try{
          var h = Math.floor(millis / 3600000),
            m = Math.floor(millis / 60000),
            s = ((millis % 60000) / 1000).toFixed(0);
          if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
          else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
        }catch (e){
          console.log(String(e.stack).bgRed)
        }
      }

      function createBar(total, current, size = 25, line = "▬", slider = config.settings.progressbar_emoji) {
        /*  OLD CREATE BAR WAY

        try{
          //player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", config.settings.progressbar_emoji)
          if (!player.queue.current) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
          let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
          let total = player.queue.current.duration;
          let size = 25;
          let line = "▬";
          let slider = config.settings.progressbar_emoji;
          let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
          if (!String(bar).includes(config.settings.progressbar_emoji)) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
          return `**[${bar[0]}]**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
        }catch (e){
          console.log(String(e.stack).bgRed)
        }*/

        /* NEW WAY */
        try{
          if (!player.queue.current) return `**${emoji.msg.progress_bar.leftindicator}${emoji.msg.progress_bar.filledframe}${emoji.msg.progress_bar.emptyframe.repeat(size - 1)}${emoji.msg.progress_bar.rightindicator}**\n**00:00:00 / 00:00:00**`;
          let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
          let total = player.queue.current.duration;
          let size = 15;
          let bar = String(emoji.msg.progress_bar.leftindicator) + String(emoji.msg.progress_bar.filledframe).repeat(Math.round(size * (current / total))) + String(emoji.msg.progress_bar.emptyframe).repeat(size - Math.round(size * (current / total))) + String(emoji.msg.progress_bar.rightindicator);
          return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
        }catch (e){
          console.log(String(e.stack).bgRed)
        }

      
        /* CUSTOM WAY 
        try{
        // EMOJIS.JSON
          // "progress_bar": {
          //  "leftindicator": "<:progressbar_left_filled:818558865268408341>",
          //  "rightindicator": "<:progressbar_right_filled:818558865540907038>",
          //
          //  "emptyframe": "<:progressbar_middle_unfilled:818558865532649503>",
          //  "filledframe": "<:progressbar_middle_filled:818558865595564062>",
          //
          //  "emptybeginning": "<:progressbar_left_filled_hal:818558865628725298>",
          //  "emptyend": "<:progressbar_right_unfilled:818558865619681300>"
          // }

          if (!player.queue.current) return `**${emoji.msg.progress_bar.emptybeginning}${emoji.msg.progress_bar.filledframe}${emoji.msg.progress_bar.emptyframe.repeat(size - 1)}${emoji.msg.progress_bar.emptyend}**\n**00:00:00 / 00:00:00**`;
          let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
          let total = player.queue.current.duration;
          let size = 15;
          let rightside = size - Math.round(size * (current / total));
          let leftside  = Math.round(size * (current / total));
          let bar;
          if(leftside < 1 ) bar = String(emoji.msg.progress_bar.emptybeginning) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(emoji.msg.progress_bar.emptyend);
          else bar = String(emoji.msg.progress_bar.leftindicator) + String(emoji.msg.progress_bar.filledframe).repeat(leftside) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(size - rightside !== 1 ? emoji.msg.progress_bar.emptyend : emoji.msg.progress_bar.rightindicator);
          return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
        }catch (e){
          console.log(String(e.stack).bgRed)
        }*/
      }

      function edit_10_s_np(track_info_msg, track, queue_info_msg, client, player) {
        track_info_msg.edit(SongEmbed(player.queue.current)).catch(e => String(e.stack).yellow);
        queue_info_msg.edit(QueueEmbed(client, player)).catch(e => String(e.stack).yellow);
      }
      //GET QUEUE INFO MSG
      let queue_info_msg = await message.channel.messages.fetch(db.message_queue_info);
      //IF NO QUEUE INFO MSG AVAILABLE --> resend it --> try find TRACK INFO MSG --> delete it!
      if (!queue_info_msg) return message.channel.send(new MessageEmbed()).then(async msg => {
        message.edit(QueueEmbed(client, player)).catch(e => String(e.stack).yellow);
        client.setups.set(message.guild.id, msg.id, "message_queue_info");
        let track_info_msg = await message.channel.messages.fetch(db.message_track_info);
        if (track_info_msg) track_info_msg.delete().catch(e => String(e.stack).yellow);
        return message.channel.send(new MessageEmbed()).then(msg => {
          msg.edit(SongEmbed(player.queue.current)).catch(e => String(e.stack).yellow);
          client.setups.set(message.guild.id, msg.id, "message_track_info");
        })
      })
      //GET TRACK INFO MSG
      let track_info_msg = await message.channel.messages.fetch(db.message_track_info);
      //IF NO TRACK INFO MSG --> DELETE
      if (!track_info_msg) return message.channel.send(new MessageEmbed()).then(msg => {
        msg.react(emoji.react.rewind) //rewind 20 seconds
        msg.react(emoji.react.forward) //forward 20 seconds
        msg.react(emoji.react.pause_resume) //pause / resume
        msg.react(emoji.react.stop) //stop playing music
        msg.react(emoji.react.previous_track) //skip back  track / (play previous)
        msg.react(emoji.react.skip_track) //skip track / stop playing
        msg.react(emoji.react.replay_track) //replay track
        msg.react(emoji.react.reduce_volume)  //reduce volume by 10%
        msg.react(emoji.react.raise_volume)  //raise volume by 10%
        msg.react(emoji.react.toggle_mute)  //toggle mute
        msg.react(emoji.react.repeat_mode) //change repeat mode --> track --> Queue --> none
        msg.react(emoji.react.autoplay_mode)  //toggle autoplay mode
        msg.react(emoji.react.shuffle) //shuffle the Queue
        msg.react(emoji.react.show_queue) //shows the Queue
        msg.react(emoji.react.show_current_track) //shows the current Track
        msg.edit(SongEmbed(player.queue.current));
        client.setups.set(message.guild.id, msg.id, "message_track_info");
      })
      track_info_msg.edit(SongEmbed(player.queue.current)).catch(e => String(e.stack).yellow);
      queue_info_msg.edit(QueueEmbed(client, player)).catch(e => String(e.stack).yellow);
      for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 20 * 1000);
        });
        if (i >= 5) i = 0;
        const curplayer = client.manager.players.get(player.guild);
        if (!curplayer) {
          reset(track_info_msg, queue_info_msg);
          break;
        }
        edit_10_s_np(track_info_msg, track, queue_info_msg, client, curplayer)
      }

      function reset(track_info_msg, queue_info_msg) {
        let embed2 = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("Little Music | Music Queue")
          .setDescription(`Empty\nJoin a voice channel and queue songs by name or url in here.`)
        let embed3 = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("Currently no song is playing!")
          .setDescription(`Join a voice channel and enter a song name or url to play.\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1194721105&scope=bot) • [Support Server](https://discord.gg/kUuNQwnvCF)`)
          .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")
          track_info_msg.edit(embed3).catch(e => String(e.stack).yellow);
        queue_info_msg.edit(embed2).catch(e => String(e.stack).yellow);
      }
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  edit_request_message_queue_info: async function(client, player) {
    try{
      const queue = player.queue;
      const embed = new MessageEmbed().setAuthor(`Little Music | Music Queue`);
      const multiple = 15;
      const page = 1;
      const end = page * multiple;
      const start = end - multiple;
      const tracks = queue.slice(start, end);
      if (queue.current) embed.addField("**0) CURRENT TRACK**", `**${queue.current.title.substr(0, 60)}** - ${queue.current.isStream ? "LIVE STREAM" : format(queue.current.duration)}\n*request by: ${queue.current.requester.tag}*`);
      if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
      else embed.setDescription(tracks.map((track, i) => `**${start + ++i})** **${track.title.substr(0, 60)}** - ${track.isStream ? "LIVE STREAM" : format(track.duration)}\n*request by: ${track.requester.tag}*`).join("\n"));
      embed.setColor(ee.color);
      embed.setFooter(ee.footertext, ee.footericon);
      embed;
      let message = player.get("message");
      let db = client.setups.get(message.guild.id)

      function SongEmbed(track) {
        let embed = new MessageEmbed()
        try {
          embed.setTitle(`Playing ${emoji.msg.playing} **\`` + track.title + "`**")
        } catch {}
        try {
          embed.setURL(track.uri)
        } catch {}
        try {
          embed.setColor(ee.color)
        } catch {}
        try {
          embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)
        } catch {}
        try {
          embed.addField(`${emoji.msg.time} Duration: `, `${track.isStream ? "LIVE STREAM" : format(track.duration)}`, true)
        } catch {}
        try {
          embed.addField(`${emoji.msg.song_by} Song By: `, `${track.author}`, true)
        } catch {}
        try {
          embed.addField(`${emoji.msg.raise_volume} Volume`, `${player.volume}%`, true)
        } catch {}
        try {
          embed.addField(`${emoji.msg.autoplay_mode} Autoplay:`, `${player.get("autoplay") ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)
        } catch {}
        try {
          embed.addField(`${player.queueRepeat ? `${emoji.msg.repeat_mode} Queue Loop: ` : `${emoji.msg.repeat_mode} Song Loop: `}`, `${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)
        } catch {}
        try {
          embed.addField(`${emoji.msg.pause_resume} State`, `${player.playing ? `${emoji.msg.resume} Playing Song` : `${emoji.msg.pause} Paused Song`}`, true)
        } catch {}
        try {
          embed.addField(`${emoji.msg.time} Progress: `, createBar(player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", config.settings.progressbar_emoji) )
        } catch {}
        try {
          embed.setFooter(`Requested by: ${track.requester.tag} | Updates every Trackupdate or 20 Seconds!`, track.requester.displayAvatarURL({
            dynamic: true
          }));
        } catch {}
        return embed;
      }

      function format(millis) {
        var h = Math.floor(millis / 3600000),
          m = Math.floor(millis / 60000),
          s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
        else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      }

      function createBar(total, current, size = 25, line = "▬", slider = config.settings.progressbar_emoji) {
        /*  OLD CREATE BAR WAY

        try{
          //player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", config.settings.progressbar_emoji)
          if (!player.queue.current) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
          let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
          let total = player.queue.current.duration;
          let size = 25;
          let line = "▬";
          let slider = config.settings.progressbar_emoji;
          let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
          if (!String(bar).includes(config.settings.progressbar_emoji)) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
          return `**[${bar[0]}]**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
        }catch (e){
          console.log(String(e.stack).bgRed)
        }*/

        
        try{
          if (!player.queue.current) return `**${emoji.msg.progress_bar.leftindicator}${emoji.msg.progress_bar.filledframe}${emoji.msg.progress_bar.emptyframe.repeat(size - 1)}${emoji.msg.progress_bar.rightindicator}**\n**00:00:00 / 00:00:00**`;
          let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
          let total = player.queue.current.duration;
          let size = 15;
          let bar = String(emoji.msg.progress_bar.leftindicator) + String(emoji.msg.progress_bar.filledframe).repeat(Math.round(size * (current / total))) + String(emoji.msg.progress_bar.emptyframe).repeat(size - Math.round(size * (current / total))) + String(emoji.msg.progress_bar.rightindicator);
          return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
        }catch (e){
          console.log(String(e.stack).bgRed)
        }

      
        /* CUSTOM WAY 
        try{
        // EMOJIS.JSON
          // "progress_bar": {
          //  "leftindicator": "<:progressbar_left_filled:818558865268408341>",
          //  "rightindicator": "<:progressbar_right_filled:818558865540907038>",
          //
          //  "emptyframe": "<:progressbar_middle_unfilled:818558865532649503>",
          //  "filledframe": "<:progressbar_middle_filled:818558865595564062>",
          //
          //  "emptybeginning": "<:progressbar_left_filled_hal:818558865628725298>",
          //  "emptyend": "<:progressbar_right_unfilled:818558865619681300>"
          // }

          if (!player.queue.current) return `**${emoji.msg.progress_bar.emptybeginning}${emoji.msg.progress_bar.filledframe}${emoji.msg.progress_bar.emptyframe.repeat(size - 1)}${emoji.msg.progress_bar.emptyend}**\n**00:00:00 / 00:00:00**`;
          let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
          let total = player.queue.current.duration;
          let size = 15;
          let rightside = size - Math.round(size * (current / total));
          let leftside  = Math.round(size * (current / total));
          let bar;
          if(leftside < 1 ) bar = String(emoji.msg.progress_bar.emptyf) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(emoji.msg.progress_bar.emptyframe);
          else bar = String("[") + String(emoji.msg.progress_bar.filledframe).repeat(leftside) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(size - rightside !== 1 ? emoji.msg.progress_bar.emptyframe : "]");
          return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
        }catch (e){
          console.log(String(e.stack).bgRed)
        }
        */
      }
      //GET QUEUE INFO MSG
      let queue_info_msg = await message.channel.messages.fetch(db.message_queue_info);
      //IF NO QUEUE INFO MSG AVAILABLE --> resend it --> try find TRACK INFO MSG --> delete it!
      if (!queue_info_msg) return message.channel.send(new MessageEmbed()).then(async msg => {
        message.edit(embed).catch(e => String(e.stack).yellow);
        client.setups.set(message.guild.id, msg.id, "message_queue_info");
        let track_info_msg = await message.channel.messages.fetch(db.message_track_info);
        if (track_info_msg) track_info_msg.delete().catch(e => String(e.stack).yellow);
        return message.channel.send(new MessageEmbed()).then(msg => {
          msg.edit(SongEmbed(player.queue.current)).catch(e => String(e.stack).yellow);
          client.setups.set(message.guild.id, msg.id, "message_track_info");
        })
      })
      queue_info_msg.edit(embed)

      function format(millis) {
        var h = Math.floor(millis / 3600000),
          m = Math.floor(millis / 60000),
          s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      }
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  swap_pages: async function(client, message, description, TITLE){
      let currentPage = 0;
      //GET ALL EMBEDS
      let embeds = [];
      //if input is an array
      if(Array.isArray(description)){
        try {
            let k = 15;
            for (let i = 0; i < description.length; i += 15) {
                const current = description.slice(i, k);
                k += 15;
                const embed = new Discord.MessageEmbed()
                .setDescription(current)
                .setTitle(TITLE)
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                embeds.push(embed);
            }
            embeds;
        } catch { }
      }
      else{
        try {
            let k = 1000;
            for (let i = 0; i < description.length; i += 1000) {
                const current = description.slice(i, k);
                k += 1000;
                const embed = new Discord.MessageEmbed()
                .setDescription(current)
                .setTitle(TITLE)
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                embeds.push(embed);
            }
            embeds;
        } catch { }
      }
      if(embeds.length === 1) return message.channel.send(embeds[0])
      const queueEmbed = await message.channel.send(
          `**Current Page - ${currentPage + 1}/${embeds.length}**`,
          embeds[currentPage]
      );
      let reactionemojis = ["⬅️", "⏹", "➡️"];
      try {
          for(const emoji of reactionemojis)
          await queueEmbed.react(emoji);
      } catch { }

      const filter = (reaction, user) =>
          (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
      const collector = queueEmbed.createReactionCollector(filter, { time: 45000 });

      collector.on("collect", async (reaction, user) => {
          try {
              if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
                  if (currentPage < embeds.length - 1) {
                      currentPage++;
                      queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
                  else {
                    currentPage = 0
                    queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
              } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
                  if (currentPage !== 0) {
                      --currentPage;
                      queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
                  else {
                    currentPage = embeds.length - 1
                    queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
              } else {
                  collector.stop();
                  reaction.message.reactions.removeAll();
              }
              await reaction.users.remove(message.author.id);
          } catch { }
      });

  },
  swap_pages2: async function(client, message, embeds){
      let currentPage = 0;
      if(embeds.length === 1) return message.channel.send(embeds[0])
      queueEmbed = await message.channel.send(
          `**Current Page - ${currentPage + 1}/${embeds.length}**`,
          embeds[currentPage]
      );
      let reactionemojis = ["⬅️", "⏹", "➡️"];
      try {
          for(const emoji of reactionemojis)
          await queueEmbed.react(emoji);
      } catch { }

      const filter = (reaction, user) =>
          (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
      const collector = queueEmbed.createReactionCollector(filter, { time: 45000 });

      collector.on("collect", async (reaction, user) => {
          try {
              if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
                  if (currentPage < embeds.length - 1) {
                      currentPage++;
                      queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
                  else {
                    currentPage = 0
                    queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
              } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
                  if (currentPage !== 0) {
                      --currentPage;
                      queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
                  else {
                    currentPage = embeds.length - 1
                    queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
              } else {
                  collector.stop();
                  reaction.message.reactions.removeAll();
              }
              await reaction.users.remove(message.author.id);
          } catch { }
      });

  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
