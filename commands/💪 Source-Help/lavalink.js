const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
		name: "lavalink", //the name of the command
		category: "💪 Source-Help", //the category this will be listed at, for the help cmd
		aliases: ["lava"], //every parameter can be an alias
		cooldown: 2, //this will set it to a 2 second cooldown
		usage: "lavalink", //this is for the help command for EACH cmd
		description: "Shows information about Lavalink", //the description of the command
	  run: async (client, message, args, user, text, prefix) => {
		try{
      message.channel.send(new MessageEmbed()
	      .setTitle(`Interested in using Lavalink? use \`Erela.js\``)
	      .setURL("https://www.npmjs.com/package/erela.js")
	      .addField("Bot's Source Code. ", "Don't just use the source for yourself,... please [invite](https://discord.com/api/oauth2/authorize?client_id=820386439770275850&permissions=1194721105&scope=bot) me too!")
	      .setColor(ee.color)
				.setFooter(ee.footertext, ee.footericon)
	      .addField("Download Lavalink: ", "[\`v3.3.2.5\`](https://github.com/freyacodes/Lavalink/releases/download/3.3.2.5/Lavalink.jar)" )
	      .addField("Download application.yml: ", "[\`application.yml\`](https://github.com/freyacodes/Lavalink/blob/master/LavalinkServer/application.yml.example)" )
	      .setDescription(`If your \`application.yml\` has the port set to \`2333\` (or any custom one set by you) and lavalink shows it started on 8080 it means that the application.yml wasn't found in the directory you started lavalink in.
	      \`\`\`/bot /lavalink - application.yml - lavalink.jar\`\`\`
	      If your in /bot and you run \`java -jar ./lavalink/lavalink.jar\` it will look for application.yml in /bot. Make sure to start lavalink in the directory the \`application.yml\` is located.`)
      );
		} catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
};
