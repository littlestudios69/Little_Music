const Discord = require(`discord.js`);
const {
    MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
    name: `lautfm`,
    category: `🎶 Music`,
    aliases: [`laut`, "laut.fm", "laut-fm"],
    description: `Play a Laut.fm Radio Station.`,
    usage: `lautfm <radioname>`,
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            //get the channel instance
            const {
                channel
            } = message.member.voice;
            //if not in a voice Channel return error
            if (!channel)
                return message.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`${emoji.msg.ERROR} Error | You need to join a voice channel.`)
                    ]
                });
            //if no args return error
            if (!args[0])
                return message.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`${emoji.msg.ERROR} Error | You need to give me a the Name of the Station.`)
                    ]
                });

            message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setDescription(`Are you sure to play [${args[0]}](https://laut.fm/${args[0].toLowerCase()})?\nPlease reply with yes or no!`)
                ]
            });

            message.channel.awaitMessages(m => m.author.id == message.author.id, {
                max: 1,
                time: 30000
            }).then(collected => {
                // only accept messages by the user who sent the command
                // accept only 1 message, and return the promise after 30000ms = 30s

                // first (and, in this case, only) message of the collection
                if (collected.first().content.toLowerCase() == 'yes') {
                    const player = client.manager.players.get(message.guild.id);
                    //f not in the same channel --> return
                    if (player && channel.id !== player.voiceChannel)
                        return message.channel.send({
                            embeds: [new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
                                .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
                            ]
                        });
                    //play the SONG from YOUTUBE
                    playermanager(client, message, Array(`https://stream.laut.fm/${args[0].toLowerCase()}`), `song:radio`);
                } else
                    return message.reply('Operation canceled.');
            }).catch(() => {
                message.reply('No answer after 30 seconds, operation canceled.');
            });

            
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                    .setDescription(`\`\`\`${e.message}\`\`\``)
                ]
            });
        }
    }
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