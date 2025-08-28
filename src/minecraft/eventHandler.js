const config = require("../../config.json")
const {getTime} = require("../core/functions")
let {playerList} = require("../core/globalVars")
const {parentPort} = require('worker_threads');

module.exports.logger = function(bot){
    console.log(`${getTime()} [main] attempting to connect to ${config.minecraft.server.ip}:${config.minecraft.server.port}`);

    //bot.on('chat', (username, message) => {onChat(bot, username, message)})
    //bot.on('playerJoined', (player) => {onJoin(bot, player)});
    //bot.on('playerLeft', (player) => {onLeave(bot, player)});
    //bot.on('death', () => { death()})
    bot.on('end', (reason) => { selfLogout(reason)})
    bot.on('error', (err) => { botError(err)})
    bot.on('login', () => { onLogin(bot)})
    //bot.on('whisper',(username, message) => {onWhisper(username, message)})
    bot.on('kicked', (reason, loggedIn) => { onKicked(reason, loggedIn)})

    function onChat (bot, username, message) {
        console.log(`${getTime()} [mc-eventHandler] [chat] <${username}> ${message}`);
    }

    function onWhisper(username, message) {
        console.log(`${getTime()} [mc-eventHandler] [whisper] <${username}> -> <${bot._client.username}> ${message}`);
    }

    function onKicked (reason, loggedIn) {
        if (loggedIn == false) {
            console.error(`${getTime()} [mc-eventHandler] [server] bot got kicked during login, account may be banned.`)
            console.error(`${getTime()} [mc-eventHandler] ${reason}`)
            parentPort.on("message", msg => {
                msg.port.postMessage('exit')
            })
        } else {
            console.warn(`${getTime()} [mc-eventHandler] [server] i got kicked lol`);
            console.warn(`${getTime()} [mc-eventHandler] ${reason}`)
        }
    }


    function onJoin (bot, player)  {
        //if (player.username !== bot.username) {
        //    console.log(`${getTime()} [mc-eventHandler] [join] ${player.username} joined.`);
        //}
        //playerList.push(player.username);
    }

    function onLeave(bot, player)  {
        //if (player.username === bot.username) return
        //console.log(`${getTime()} [mc-eventHandler] [leave] ${player.username} left.`);
        //for(let i = 0; i < playerList.length; i++) {
        //    if (playerList[i] === player.username) {
        //        playerList.splice(i, 1);
        //    }
        //}
    }

    function selfLogout(reason) {
        console.warn(`${getTime()} [mc-eventHandler] [disconnect] Bot disconnected! (${reason}) Attempting to reconnect...`);
        playerList = [];
    }
    
    function botError(err) {
        console.error(`${getTime()} [mc-eventHandler] [error] Bot encountered a problem. See below for more information`);
        switch (err.code) {
            case "ECONNREFUSED":
                console.error(`${getTime()} [mc-eventHandler] [${err.code}] Failed to connect to ${err.address}:${err.port}`)
                break;
            case "ECONNRESET":
                console.error(`${getTime()} [mc-eventHandler] [${err.code}] Connection failed to ${err.address}:${err.port}`)
                break;
            default:
                console.error(`${getTime()} [mc-eventHandler] [${err.code}] ${err}`)
        }
    }

    function onLogin(bot) {
        console.log(`${getTime()} [mc-eventHandler] logged in as ${bot._client.username}, connected to ${config.minecraft.server.ip}:${config.minecraft.server.port}`);
    }

    function death() {
        console.log(`${getTime()} [mc-eventHandler] [death] I DIED NOOOOO.`);
    }

}
