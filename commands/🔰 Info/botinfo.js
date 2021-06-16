const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
module.exports = {
  name: "botinfo",
  aliases: ["info"],
  category: "🔰 Info",
  description: "Sends detailed info about the client",
  usage: "botinfo",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      cpuStat.usagePercent(function (e, percent, seconds) {
        if (e) {
          return console.log(String(e.stack).red);
        }
        let connectedchannelsamount = 0;
        let guilds = client.guilds.cache.map((guild) => guild);
        for (let i = 0; i < guilds.length; i++) {
          if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
        }

        const promises = [
          client.shard.fetchClientValues('guilds.cache.size'),
          client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
        ];
        return Promise.all(promises)
          .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            connectedchannelsamount += 300;
            if (connectedchannelsamount > Number(totalGuilds)) connectedchannelsamount = Number(totalGuilds);
            let guilds = [],
              users = [];
            let countertest = 0;
            for (let item of results[0]) guilds.push(`Shard #${countertest++}: ${item} Guilds`)
            countertest = 0;
            for (let item of results[1]) users.push(`Shard #${countertest++}: ${item} Users`)
            const botinfo = new Discord.MessageEmbed()
              .setAuthor(client.user.username, client.user.displayAvatarURL())
              .setTitle("__**Stats:**__")
              .setColor(ee.color)
              .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
              .addField("⌚️ Uptime ", `\`${duration(client.uptime)}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("📁 Users", `\`Total: ${totalMembers} Users\`\n\`\`\`fix\n${users.join("\n")}\n\`\`\``, true)
              .addField("📁 Servers", `\`Total: ${totalGuilds} Servers\`\n\`\`\`fix\n${guilds.join("\n")}\n\`\`\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``, true)
              .addField("📁 Connected Channels", `\`${connectedchannelsamount}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
              .addField("🤖 Node", `\`${process.version}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
              .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
              .addField("🤖 Arch", `\`${os.arch()}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("💻 Platform", `\`${os.platform()}\``, true)
              .addField("🏓 API Latency", `\`${client.ws.ping}ms\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("\u200b", `\u200b`)
              .addField("\u200b", `\u200b`)
              .addField("ℹ️ Disclaimer", `This Bot is a higly Modified Fork of [Tomato6966/discord-js-lavalink-Music-Bot-erela-js](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js)`)
              .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")

              let button = new Discord.MessageButton()
              .setLabel("Invite")
              .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1194721105&scope=bot`)
              .setStyle("LINK")
              let button2 = new Discord.MessageButton()
              .setLabel("Status Page")
              .setURL(`https://littlestudios.statuspage.io`)
              .setStyle("LINK")

              let button3 = new Discord.MessageButton()
              .setLabel("Support Server")
              .setURL(`https://discord.gg/kUuNQwnvCF`)
              .setStyle("LINK")
            
          let actionRow = new Discord.MessageActionRow()
              .addComponents([button])

            message.channel.send({components: [actionRow], embeds: [botinfo]});
          })
          .catch(console.error);

      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
	  .setDescription(`\`\`\`${e.message}\`\`\``)]}
      );
    }
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */