const { SlashCommand, CommandOptionType, ComponentType, ButtonStyle } = require('slash-create');
const Discord = require("discord.js");
const ee = require("../botconfig/embed.json");
const config = require(`../botconfig/config.json`);

module.exports = class InviteCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'invite',
            description: 'Retrieve an invite for the Little Music Discord bot'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        await ctx.defer();

        let embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle(":heart: Thanks for inviting me!")
            .setFooter(ee.footertext, ee.footericon)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${config.applicationID}&permissions=1194721105&scope=bot`)
            .setDescription(`[Click here](https://discord.com/api/oauth2/authorize?client_id=${config.applicationID}&permissions=1194721105&scope=bot)`)
            .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")

        return ctx.send({
            embeds: [embed.toJSON()],
            components: [{
                type: ComponentType.ACTION_ROW,
                components: [{
                    type: ComponentType.BUTTON,
                    style: ButtonStyle.LINK,
                    label: 'Invite',
                    url: `https://discord.com/api/oauth2/authorize?client_id=${config.applicationID}&permissions=1194721105&scope=bot`
                }]
            }]
        }).catch(e => console.log(e))
    }
}