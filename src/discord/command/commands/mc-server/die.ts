const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('kills the bot'),
	async execute(interaction, bot) {
        bot.chat(`/kill`)
		await interaction.reply("killed bot!! ! :3" );
	},
};
