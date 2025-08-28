const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whisper')
		.setDescription('sends a private message to a user on the server')
        .addStringOption(option =>
			option.setName('username')
                .setDescription('recipiment of the whisper message')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('message')
                .setDescription('private chat message')
				.setRequired(true)),
	async execute(interaction, bot) {
        const message = interaction.options.getString('message');
        const recipiment = interaction.options.getString('username');
        
        const interactionGuildMember= await interaction.guild.members.fetch(interaction.user.id)

        bot.chat(`/w ${recipiment} ${message}`)
		await interaction.reply("sent to " + recipiment + " privately: " + `${message}` );
	},
};
