const { Structures } = require("discord.js");

Structures.extend("GuildMember", (member) => {
	return class extends member {
		constructor(client, data, guild) {
			super(client, data, guild);
		}
		hasPermission(permissions) {
			return this.permissions.has(permissions);
		}
	}
});

/*Structures.extend("Guild", (guild) => {
	return class extends guild {
		constructor(client, data) {
			super(client, data);
			this.owner = this.members.resolve(this.ownerID);
		}
	}
});*/
