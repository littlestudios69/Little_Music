const { SlashCommand, CommandOptionType, ComponentType, ButtonStyle } = require('slash-create');
const Discord = require("discord.js");
const ee = require("../botconfig/embed.json");

module.exports = class SupportCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'support',
            description: 'Retrieve an invite to the Little Music Discord support server'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        await ctx.defer();

        let embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle(":heart: Join here!")
            .setFooter(ee.footertext, ee.footericon)
            .setURL(`https://discord.gg/kUuNQwnvCF`)
            .setDescription(`[Click here](https://discord.gg/kUuNQwnvCF) (https://discord.gg/kUuNQwnvCF)`)
            .setImage("https://cdn.discordapp.com/attachments/802144342185738250/820385232686546945/cover.png")

        return ctx.send({
            embeds: [embed.toJSON()],
            components: [{
                type: ComponentType.ACTION_ROW,
                components: [{
                    type: ComponentType.BUTTON,
                    style: ButtonStyle.LINK,
                    label: 'Support Server',
                    url: 'https://discord.gg/kUuNQwnvCF'
                }]
            }]
        }).catch(e => console.log(e))
    }
}