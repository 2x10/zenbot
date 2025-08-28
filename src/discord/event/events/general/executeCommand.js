const { Events } = require('discord.js');
const { getTime } = require("../../../../core/functions")
module.exports.eventModule = function(client, bot) {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`${getTime()} [commandHandler] [error] No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction, bot);
        } catch (error) {
            switch (error.code)
            {
                case 10062:
                    console.error(`${getTime()} [commandHandler] [error] Discord API error: unkown interaction`)
                    break;
                default:
                    console.error(`${getTime()} [commandHandler] [error] [${error}`)
            }
        }
    });
}