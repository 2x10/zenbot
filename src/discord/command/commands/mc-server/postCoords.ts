const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coords')
		.setDescription('shows the current coordinates of the bot'),
	async execute(interaction, bot) {
		const embed = new EmbedBuilder()
	        .setColor(0xFF00FF)
	        .setTitle(`here are my coords!`)
	        .setDescription("``" + `${bot.entity.position.toString()}` + "``")
		await interaction.reply({embeds: [embed]});
	},
};
