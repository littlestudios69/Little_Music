const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const radios = JSON.parse(require("fs").readFileSync(__dirname + "/../../botconfig/radiostations.json"));
const playermanager = require(`../../handlers/playermanager`);
const { stations, swap_pages2 } = require(`../../handlers/functions`);
module.exports = {
    name: `radio`,
    category: `🎶 Music`,
    aliases: [`stream`],
    description: `Plays a defined radiostream`,
    usage: `radio <1-183>`,
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance from the Member
      const { channel } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel)
        return message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
		.setTitle(`${emoji.msg.ERROR} Error | You need to join a voice channel.`)]}
        );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if there is a player and they are not in the same channel, return Error
      if (player && channel.id !== player.voiceChannel)
        return message.channel.send({embeds: [new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
		.setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)]}
        );
      //if no args send all stations
      if (!args[0]) return swap_pages2(client, message, await stations(client, config.prefix, message))
      //if not a number error
      if (isNaN(args[0])) {
          return message.channel.send({embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | Not a valid radio station`)
		  .setDescription(`Please use a the following format: \`m!radio <number>\``)]}
          );
      }
      //if the volume number is not valid
      if (Number(args[1]) > 150 || Number(args[1]) < 1)
        return message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Volume Number out of Range`)
		.setDescription(`Please use a Number between \`1\` and \`150\``)]}
        );
      //define the volume
      let volume;
      //if its not a number for volume, set it to 50
      if (isNaN(args[1])) {
          volume = 50;
      }
      //otherwise set it to the args
      else {
          volume = args[1];
      }
      //define args 2 of each single input
      let args2;
     let num = 0
     let found = false
     for (var prop in radios.EU) {
      
    
     await radios.EU[prop].forEach(el => {
       num++
       
       if(num === Number(args[0])) {
         args2 = el.split(` `)
         found = true
       }
     });
    }
    
    for (var prop2 in radios.OTHERS) {
    await radios.OTHERS[prop2].forEach(el => {
      num++
     
             if(num === Number(args[0])) {
        args2 = el.split(` `)
        found = true
      }
    });
    }
      //if not found send an error
      if(args2 === undefined || args2 === null)

        return message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Radio Station not found`)
		.setDescription(`Please use a Station between \`1\` and \`${num}\``)]}
        );
      //get song information of it
      const song = { title: args2[0].replace(`-`, ` `), url: args2[1] };
      //define an embed
      let embed = new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`Searching: ${emoji.msg.search}` + song.title)
        try{embed.setURL(song.url)}catch{}
      //send the message of the searching
      message.channel.send({embeds: [embed]})
      //play the radio but make the URL to an array ;) like that: [ `urlhere` ]
      playermanager(client, message, Array(song.url), `song:radio`);
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
