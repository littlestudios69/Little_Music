const Discord = require(`discord.js`);
const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
    name: `searchsimilar`,
    category: `🎶 Music`,
    aliases: [`searchs`, `searchrelated`, `searchr`],
    description: `Seraches a similar song of the current Track!`,
    usage: `searchsimilar`,
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance
      const { channel } = message.member.voice;
      //if not in a voice Channel return error
      if (!channel)
          return message.channel.send({embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
		  .setTitle(`${emoji.msg.ERROR} Error | You need to join a voice channel.`)]}
          );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player)
        return message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
		.setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)]}
        );
      //if not in the same channel --> return
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
		.setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)]}
        );
      //adds/plays it
      playermanager(client, message, Array(`https://www.youtube.com/watch?v=${player.queue.current.identifier}&list=RD${player.queue.current.identifier}`), `similar:search`);
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
};
