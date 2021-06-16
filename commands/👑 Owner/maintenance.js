const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `maintenance`,
    category: `👑 Owner`,
    aliases: [``],
    description: `Set the Maintenance Mode`,
    usage: `maintenance <on/off>`,
    run: async (client, message, args, cmduser, text, prefix) => {
      if (!config.ownerIDS.includes(message.author.id))
        return message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
		.setTitle(`${emoji.msg.ERROR}  Error | You are not allowed to run this command! Only the Owner is allowed to run this Cmd`)]}
        );
        try {
            if(args[0].toLowerCase() === "true"){
                config.maintenance = true
                
                
                message.reply("Turned Dev Mode On")
            } else  if(args[0].toLowerCase() === "false"){
                config.maintenance = false
                
                
                message.reply("Turned Dev Mode Off")
            }
            await require("fs").writeFile(`./botconfig/config.json`, JSON.stringify(config, null, 3), (e) => {
                if (e) {
                  console.log(String(e.stack).red);
                  return message.channel.send({embeds: [new MessageEmbed()
                    .setFooter(ee.footertext,ee.footericon)
                    .setColor(ee.wrongcolor)
                    .setTitle(`${emoji.msg.ERROR}  ERROR Writing the File`)
				  .setDescription(`\`\`\`${e.message}\`\`\``)]}
                  )
                }
                return message.channel.send({embeds: [new MessageEmbed()
                  .setFooter(ee.footertext,ee.footericon)
                  .setColor(ee.color)
				.setTitle(`${emoji.msg.SUCCESS}  Saved Config`)]}
                )
              });
          } catch (e) {
              console.log(String(e.stack).bgRed)
              return message.channel.send({embeds: [new MessageEmbed()
                  .setColor(ee.wrongcolor)
      						.setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
			  .setDescription(`\`\`\`${e.message}\`\`\``)]}
              );
          }
    },
};
