const config = require("../../../config.json")
const {getTime} = require("../../core/functions")
const { WebhookClient, EmbedBuilder } = require('discord.js');
let entryCounter = 0;
let {playerList} = require("../../core/globalVars")

chat = Object.freeze({
    webhook: new WebhookClient({ id: config.discord.webhook.chat.id , token: config.discord.webhook.chat.token })
});

notifications = Object.freeze({
    webhook: new WebhookClient({ id: config.discord.webhook.notifications.id , token: config.discord.webhook.notifications.token })
});
entry0 = Object.freeze({
    webhook: new WebhookClient({ id: config.discord.webhook.entry0.id , token: config.discord.webhook.entry0.token })
});
entry1 = Object.freeze({
    webhook: new WebhookClient({ id: config.discord.webhook.entry1.id , token: config.discord.webhook.entry1.token })
});
module.exports.chatbridge = function(bot) {
    console.log(`${getTime()} [discord] [webhook] webhooks workin!`)
    bot.on('chat', (username, message) => {onMessage(bot, username, message) })
    bot.on('playerJoined', (player) => {onEntry(bot, player, "join")});
    bot.on('playerLeft', (player) => {onEntry(bot, player, "leave")});
    bot.on('death', () => { onDeath(bot)})
    bot.on('end', (reason) => { onLogout(bot, reason)})
    bot.on('error', (err) => { botError(bot, err)})
    bot.on('login', () => { onLogin(bot)})
    bot.on('kicked', (reason, loggedIn) => { onKicked(reason, loggedIn)})
    bot.on('whisper', (reason, loggedIn) => { onDM(reason, loggedIn)})

    function onKicked(reason, loggedIn) {
        let message = "";
        if (loggedIn == false) {
            message = "bot got kicked from server while logging in"
        } else {
            message = "bot got kicked from server"
        }

        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(message)
            .setDescription("``" + reason + "``")

        notifications.webhook.send({
            username: bot._client.username,
            embeds: [embed],
            avatarURL: `https://mc-heads.net/head/${bot._client.username}`
        });
    }

    function onMessage(bot, username, message) {
    	if (username === bot.chat) return
    	chat.webhook.send({
    		username: username,
    		avatarURL: `https://mc-heads.net/head/${username}`,
            content: "``" + message + "``"
        });
    }

    function onEntry(bot, player, entry) {
        if (player.username === bot.username) return
        if (entry=="join") {
            playerList.push(player.username);
            entry0.webhook.send({
                username: config.minecraft.server.ip,
                content: "``" + `${player.username} joined.` + "``",
            });
        }
        if (entry=="left") {
            for(let i = 0; i < playerList.length; i++) {
                if (playerList[i] === player.username) {
                    playerList.splice(i, 1);
                }
            }
            entry1.webhook.send({
                username: config.minecraft.server.ip,
                content: "``" + `${player.username} left.` + "``",
            });
        }
    }

    function onLogout(bot, reason) {
        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`Bot disconnected!`)
            .setDescription("``" + reason + "``")

        notifications.webhook.send({
            username: bot._client.username,
            embeds: [embed]
        });
    }
    
    function botError(bot, err) {
        const embed = new EmbedBuilder()
	        .setColor(0xFF0000)
	        .setTitle(`Bot error occured of code ${err.code}`)
	        .setDescription("``" + err + "``")

        notifications.webhook.send({
            username: bot._client.username,
            avatarURL: `https://mc-heads.net/head/${bot._client.username}`,
            embeds: [embed]
        });
    }

    function onLogin(bot) {
        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle(`sucessfully logged into ${config.minecraft.server.ip}`)
            .setDescription(`logged in as ${bot._client.username}`)

        notifications.webhook.send({
            username: bot._client.username,
            embeds: [embed],
            avatarURL: `https://mc-heads.net/head/${bot._client.username}`
        });
    }

    function onDeath(bot) {
        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`my dumbass just fucking died lol`)
            .setDescription("death coords: ``" + bot.entity.position.toString() + "``")

        chat.webhook.send({
            username: bot._client.username,
            embeds: [embed],
            avatarURL: `https://mc-heads.net/head/${bot._client.username}`
        });
    }

    function onDM(username, message) {
        chat.webhook.send({
            username: username,
            avatarURL: `https://mc-heads.net/head/${username}`,
            content: "**whispered to you** : ``" + message + "``"
        });
    }
}