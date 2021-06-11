const { SlashCommand, CommandOptionType, ComponentType, ButtonStyle } = require('slash-create');
const Discord = require("discord.js");
const ee = require("../botconfig/embed.json");

module.exports = class PrivacyCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'privacy',
            description: 'Provides you with a link to the Little Music privacy policy'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        await ctx.defer();

        let embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription(`https://little-studios.tech/privacy or https://paste.gg/p/anonymous/fdd9e0258d7f496b89cc880a82c85a2b`)

        return ctx.send({
            embeds: [embed.toJSON()],
            components: [{
                type: ComponentType.ACTION_ROW,
                components: [{
                    type: ComponentType.BUTTON,
                    style: ButtonStyle.LINK,
                    label: 'Privacy Policy',
                    url: 'https://paste.gg/p/anonymous/fdd9e0258d7f496b89cc880a82c85a2b'
                }]
            }]
        }).catch(e => console.log(e))
    }
}