const { Collection, Events } = require('discord.js');
const { getTime } = require("../../core/functions")
let {commandCount, failedCommandCount} = require("../../core/globalVars")
const fs = require('node:fs');
const path = require('node:path');

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

module.exports.commandHandler = function(client, bot) { 
    commandCount = 0;
    failedCommandCount = 0;

    client.commands = new Collection();

    for (const folder of commandFolders) {
    	const commandsPath = path.join(foldersPath, folder);
    	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    	for (const file of commandFiles) {
    		const filePath = path.join(commandsPath, file);
    		const command = require(filePath);
    		if ('data' in command && 'execute' in command) {
                commandCount++;
    			client.commands.set(command.data.name, command);
    		} else {
                failedCommandCount++;
                commandCount--;
    			console.warn(`${getTime()} [commandHandler] [warning] The command at ${filePath} is missing a required "data" or "execute" property.`);
    		}
    	}
    }

    console.log(`${getTime()} [discord] [commandHandler] ${commandCount} loaded, ${failedCommandCount} not loaded.`)
}