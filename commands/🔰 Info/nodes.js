const { MessageEmbed, Message } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "nodes",
    category: "🔰 Info",
    aliases: ["lv", "lavalink"],
    cooldown: 5,
    usage: "nodes",
    description: "Sends you some Informations about our Nodes",
    run: async (client, message, args, user, text, prefix) => {
    try{
        let embed = new MessageEmbed()
        .setTitle("Music Nodes Informations")
        .setDescription("Here are some infos about our Music Nodes!")
        
        client.manager.nodes.forEach(node => {
            embed.addField(`🤖 ${node.options.identifier}`, `**🌐 Region:**\n${node.options.region}\n\n**⏯️ Playing Players:**\n${node.stats.playingPlayers}\n\n**⏳ Memory:**\n${bytesToSize(node.stats.memory.used)}/${bytesToSize(node.stats.memory.allocated)} - Free ${bytesToSize(node.stats.memory.free)}\n\n**⌚️ Uptime:**\n${msToTime(node.stats.uptime)}`, true)
        })
        embed
        .addField("\u200b", `\u200b`)
        .addField(`🤖 Connected Nodes`, `${client.manager.nodes.size}`, true)
        .addField("\u200b", `\u200b`)

        .setColor(ee.color)
        .addField(`➕ Enabled Addons`, `Spotify, Deezer`, true)
        .addField("\u200b", `\u200b`, true)
        .addField("\u200b", `\u200b`)
        .addField("\u200b", `\u200b`)
        .addField("📊 Status Page", "[Click here](https://littlestudios.statuspage.io)", true)
        .addField("🤝 Support Server", "[Click here](https://discord.gg/kUuNQwnvCF)", true)
        .addField("ℹ️ Disclaimer", `This Bot is a higly Modified Fork of [Tomato6966/discord-js-lavalink-Music-Bot-erela-js](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js)`)
        .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")
      message.channel.send({embeds: [embed]});
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
}
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }
 function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return hrs + ':' + mins + ':' + secs + '.' + ms;
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
