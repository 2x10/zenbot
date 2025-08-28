const config = require("../../config.json");
const {commandHandler} = require("./command/commandHandler");
const {eventHandler} = require("./event/eventHandler");
const { Client, GatewayIntentBits } = require('discord.js');

module.exports.discordBot = function(bot) {
    let client = new Client({ 
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages
        ]
    });
    
    try {
        commandHandler(client, bot)
        eventHandler(client, bot)
    } catch (err) {
        console.error(err)
    }

    client.login(config.discord.bot.token);

    bot.on('end', () => {
        client.destroy();
    })

    bot.on('error', () => {
        client.destroy();
    })
}