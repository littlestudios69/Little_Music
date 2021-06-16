const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);

module.exports = {
    name: "privacy",
    category: "🔰 Info",
    aliases: [],
    cooldown: 2,
    usage: "privacy",
    description: "Gives you the Privacy Policy",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let embed = new Discord.MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setDescription(`https://little-studios.tech/privacy or https://paste.gg/p/anonymous/fdd9e0258d7f496b89cc880a82c85a2b`)

            let button = new Discord.MessageButton()
                .setLabel("Privacy Policy")
                .setURL(`https://paste.gg/p/anonymous/fdd9e0258d7f496b89cc880a82c85a2b`)
                .setStyle("LINK")

            let actionRow = new Discord.MessageActionRow()
                .addComponents([button])

            message.channel.send({components: [actionRow], embeds: [embed]});
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send({embeds: [new Discord.MessageEmbed()
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
