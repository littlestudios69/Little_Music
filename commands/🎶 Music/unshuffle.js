const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `unshuffle`,
    category: `🎶 Music`,
    aliases: [`unmix`,`oldshuffle`,`undoshuffle`,`oldqueue`,`us`],
    description: `Unshuffles the Queue - Restores the old Queue`,
    usage: `unshuffle`,
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance from the Member
      const { channel } = message.member.voice;
      //if the member is not in a channel, return
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
          .setFooter(ee.footertext, ee.footericon)
		.setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)]}
        );
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel)
        return message.channel.send({embeds: [new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
		.setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)]}
        );
      //if no shuffle happened, return error
      if(!player.get(`beforeshuffle`))
        return message.channel.send({embeds: [new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Error | You haven't shuffled this Queue yet!`)
		.setDescription(`To shuffle it type: \`${prefix}shuffle\``)]}
        );
        //clear teh Queue
        player.queue.clear();
        //now add every old song again
        for(const track of player.get(`beforeshuffle`))
          player.queue.add(track);
      //return success message
      return message.channel.send({embeds: [new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.shuffle} **Re**shuffled the Queue`)
        .setColor(ee.color)
	  .setFooter(ee.footertext, ee.footericon)]}
      );
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
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
