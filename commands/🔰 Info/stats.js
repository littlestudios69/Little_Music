const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {getRandomInt} = require("../../handlers/functions");

module.exports = {
    name: "stats",
    category: "🔰 Info",
    aliases: ["musicstats"],
    cooldown: 10,
    usage: "stats",
    description: "Shows music Stats, like amount of Commands and played Songs etc.",
    run: async (client, message, args, user, text, prefix) => {
        try {
            let global = client.stats.get("global");
            let guild = client.stats.get(message.guild.id);
            let premiums = client.premium.get("premiumlist", "list");
            let guilds = [];
            let users = [];

            for (let i = 0; i < premiums.length; i++) {
                try {
                    if (Object.keys(premiums[i])[0] === "g") {
                        let guild = client.guilds.cache.get(Object.values(premiums[i])[0])
                        if (!guild) {
                            client.premium.get("premiumlist", (value) => value.g === Object.values(premiums[i])[0], "list");
                            continue;
                        }
                        guilds.push(guild.name)
                    }
                } catch {
                }
            }
            for (let i = 0; i < premiums.length; i++) {
                try {
                    if (Object.keys(premiums[i])[0] === "u") {
                        let user = await client.users.fetch(Object.values(premiums[i])[0]);
                        if (!user) {
                            client.premium.get("premiumlist", (value) => value.u === Object.values(premiums[i])[0], "list");
                            continue;
                        }
                        users.push(user.tag)
                    }
                } catch {
                }
            }
            let size = client.setups.filter(s => s.textchannel != "0").size + client.guilds.cache.array().length / 3;
            if (size > client.guilds.cache.array().length) size = client.guilds.cache.array().length;
            let embed = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                .addField("⚙️ GLOBAL Commands used:", `>>> \`${Math.ceil(global.commands * client.guilds.cache.array().length / 10)} Commands\` used\nin **all** Servers`, true)
                .addField("🎵 GLOBAL Songs played:", `>>> \`${Math.ceil(global.songs * client.guilds.cache.array().length / 10)} Songs\` played in\n**all** Servers`, true)
                .addField("📰 GLOBAL Setups created:", `>>> \`${Math.ceil(size)} Setups\` created in\n**all** Servers`, true)
                .addField("\u200b", "\u200b")
                .addField("⚙️ SERVER Commands used:", `>>> \`${guild.commands} Commands\` used in\n**this** Server`, true)
                .addField("🎵 SERVER Songs played:", `>>> \`${guild.songs} Songs\` played in\n**this** Server`, true)
                .addField("📰 GLOBAL Premium list:", `>>> \`${guilds.length} Guilds\`\n\`${users.length} Users\`\n having Premium`, true)
                .addField("\u200b", "\u200b")
                .addField("📊 Status Page", ">>> [Click here](https://littlestudios.statuspage.io)", true)
                .addField("🤝 Support Server", ">>> [Click here](https://discord.gg/kUuNQwnvCF)", true)
                .addField("ℹ️ Disclaimer", `>>> This Bot is a higly Modified Fork of [Tomato6966/discord-js-lavalink-Music-Bot-erela-js](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js)`, true)
                .setTitle(`💿 The Stats of ${client.user.username}`)
                .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")

            let statusPageButton = new Discord.MessageButton()
                .setLabel("Status Page")
                .setStyle("LINK")
                .setURL(`https://littlestudios.statuspage.io`)

            let supportButton = new Discord.MessageButton()
                .setLabel("Support Server")
                .setStyle("LINK")
                .setURL(`https://discord.gg/kUuNQwnvCF`)

            let actionRow = new Discord.MessageActionRow()
                .addComponents([statusPageButton, supportButton])

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
