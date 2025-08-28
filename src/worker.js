const {moduleHandler} = require('./minecraft/module/moduleHandler')
const {discordBot} = require('./discord/discord')
const {chatbridge} = require('./discord/webhook/webhook')
const {logger} = require('./minecraft/eventHandler')
const config = require('../config.json');

const mineflayer = require('mineflayer');

module.exports.exit = function() {
    const {parentPort} = require('worker_threads');

    parentPort.on("message", message => {
        message.port.postMessage('restart')
    })
}

let bot = mineflayer.createBot({
    host: config.minecraft.server.ip,
    port: config.minecraft.server.port,
    brand: config.minecraft.server.brand,
    version: config.minecraft.server.version,

    username: config.minecraft.account.email,
    password: config.minecraft.account.password,
    auth: config.minecraft.account.auth,

    viewDistance: 3
})

logger(bot);
chatbridge(bot);

bot.on('login', () => {
    discordBot(bot); 
    moduleHandler(bot);
})

bot.on('end', () => {
    let {exit} = require('./worker.js')
    setTimeout(exit, config.minecraft.autoReconnectDelay)
})

bot.on('error', () => {
    let {exit} = require('./worker.js')
    setTimeout(exit, config.minecraft.autoReconnectDelay)
})
