const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ignore')
		.setDescription('ignores or unignores a user (if server has /ignore)')
		.addStringOption(option =>
			option.setName('username')
                .setDescription('user to ignore or unignore')
				.setRequired(true)),
	async execute(interaction, bot) {
        const username = interaction.options.getString('username');
   
        bot.chat(`/ignore ${username}`)
		await interaction.reply(`/ignored ${username}`);
	},
};
