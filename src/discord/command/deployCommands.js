const { REST, Routes } = require('discord.js');
const config = require("../../../config.json")

const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolder = fs.readdirSync(foldersPath);

for (let folder of commandFolder) {
	let commandPath = path.join(foldersPath, folder);
	let commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
	for (let file of commandFiles) {
		let filePath = path.join(commandPath, file); 
        let command = require(filePath)
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
	}
}


const rest = new REST().setToken(config.discord.bot.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(config.discord.bot.clientId, config.discord.server.serverId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {

		console.error(error);
	}
})();