const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {MessageButton, MessageActionRow} = require('discord-buttons');

module.exports = {
    name: "invite",
    category: "🔰 Info",
    aliases: ["add"],
    cooldown: 5,
    usage: "invite",
    description: "Gives you an Invite link for this Bot",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let embed = new MessageEmbed()
                .setColor(ee.color)
                .setTitle(":heart: Thanks for inviting me!")
                .setFooter(ee.footertext, ee.footericon)
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1194721105&scope=bot`)
                .setDescription(`[Click here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1194721105&scope=bot)`)
                .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")

            let button = new MessageButton()
                .setLabel("Invite")
                .setStyle("url")
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1194721105&scope=bot`)

            let actionRow = new MessageActionRow()
                .addComponent(button)

            message.channel.send({components: [actionRow], embed: embed});
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
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
