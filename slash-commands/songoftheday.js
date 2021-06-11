const {SlashCommand, CommandOptionType, ComponentType, ButtonStyle} = require('slash-create');
const Discord = require("discord.js");
const ee = require("../botconfig/embed.json");
const emoji = require(`../botconfig/emojis.json`);
const songoftheday = require("../botconfig/songoftheday.json");

module.exports = class SongOfTheDayCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'songoftheday',
            description: 'View the current song of the day'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        await ctx.defer();

        let embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setThumbnail(songoftheday.track.thumbnail)
            .setAuthor("Today's Song of the Day")
            .setTitle(songoftheday.track.title)
            .setURL(songoftheday.track.url)
            .setDescription(`**Duration:**\n\`${songoftheday.track.duration}\`\n\n${songoftheday.message}\n\nCheck out Today's Song of the Day by running the \`playsongoftheday\` command.`)

        return ctx.send({embeds: [embed.toJSON()]}).catch(e => console.log(e))
    }
}