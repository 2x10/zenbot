const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('sends a message in the ingame chat')
		.addStringOption(option =>
			option.setName('message')
                .setDescription('chat message')
				.setRequired(true))
			.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, bot) {
        const message = interaction.options.getString('message');

        bot.chat(`${message}`)
		await interaction.reply("sent ``" + `${message}`  +  "`` to server" );
	},
};
