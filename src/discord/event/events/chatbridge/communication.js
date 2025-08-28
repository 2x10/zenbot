const { Events } = require('discord.js');
const config = require("../../../../../config.json");

module.exports.eventModule = function(client, bot) {
    client.on(Events.MessageCreate, (msg) => {
        if ((msg.channelId === config.discord.server.channelId) && 
        (msg.author.id != config.discord.webhook.chat.id) &&
        (msg.author.id != config.discord.webhook.notifications.id) &&
        (msg.author.id != config.discord.webhook.entry0.id) &&
        (msg.author.id != config.discord.webhook.entry1.id) &&
        (msg.author.id != config.discord.bot.clientId)) {
            if (msg.author.displayName === null) {
                bot.chat(`[${msg.author.tag}] ${msg.content}`)
            } else {
                bot.chat(`[${msg.author.displayName}] ${msg.content}`)
            }
        }
    });
}