const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getPlayerList } = require('../../../../core/functions')
let { playerList } = require('../../../../core/globalVars')
const config = require('../../../../../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tab')
		.setDescription('shows who is on the minecraft server'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
	        .setColor(0xFF00FF)
	        .setTitle(`there are currently ${playerList.length} users on ${config.minecraft.server.ip}`)
	        .setDescription("``" + `${getPlayerList(playerList)}` + "``")
		await interaction.reply({embeds: [embed]});
	},
};
