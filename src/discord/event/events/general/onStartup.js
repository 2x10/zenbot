const { Events } = require('discord.js');
const { getTime } = require("../../../../core/functions")
module.exports.eventModule = function(client, bot) {
    client.once(Events.ClientReady, readyClient => {
    	console.log(`${getTime()} [discord] logged in as ${readyClient.user.tag}`);
    });

    client.on("clientReady", () => {

        client.user.setActivity("Minecraft")
    })
}