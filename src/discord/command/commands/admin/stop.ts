const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

function exit() {
	process.exit(0);
}

const config = require("../../../../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stops the bot')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, bot) {
		await interaction.reply("stopping bot. . ." );
		setTimeout(exit, config.minecraft.autoReconnectDelay)
	},
};
