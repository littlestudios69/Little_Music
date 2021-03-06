const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "ping",
    category: "🔰 Info",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Gives you information on how fast the Bot can respond to you",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
	  .setDescription(`${emoji.msg.ping} Pinging....`)]}
      ).then(msg=>{
        msg.edit({embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${emoji.msg.ping} Ping is \`${Math.round(client.ws.ping)}ms\``)
		.setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")]}

        );
      })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send({embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
		.setDescription(`\`\`\`${e.message}\`\`\``)]}
        );
    }
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
