const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
const foldersPath = path.join(__dirname, '../../commands');
const commandFolders = fs.readdirSync(foldersPath);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('displays a command list.'),
	async execute(interaction, bot) {
		let commandInfo = []
		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);
				const command = require(filePath);
				if ('data' in command) {
					commandInfo.push({ name: command.data.name, value: command.data.description, inline: true })
				}
			}
		}

		const embed = new EmbedBuilder()
	        .setColor(0xFF00FF)
	        .setTitle(`some useful commands u might want to know`)
	        .setDescription("cock")
			.addFields(commandInfo)
		await interaction.reply({embeds: [embed]});
	},
};

