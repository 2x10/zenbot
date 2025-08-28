const config = require("../../../../../config.json")
const dm = config.minecraft.aliases.whisper
const {randomString, getPlayerList} = require("../../../../core/functions")
const {playerList} = require("../../../../core/globalVars")
let cooldown = new Set();

module.exports.botModule = function(bot){
    bot.on('chat', (username, message) => {
        if (username === bot.username) return

        if (message.startsWith(config.minecraft.prefix) == true) {
            const command = message.replace(config.minecraft.prefix, "").trim().toLowerCase().split(" ")

            if(cooldown.has("active")){
                return 
            } else {
                switch (command[0]) {
                    case "help" :
                        bot.chat(`${dm} ${username} ` + "won't help ya :3");
                        break
                    case "ping" : 
                        bot.chat(`${dm} ${username} ` + `pong! my ping is ${bot.player.ping}ms :3`);
                        break
                    case "about":
                        bot.chat(`${dm} ${username} ` + "stream our shit");
                        bot.chat(`${dm} ${username} ` + "https://soundcloud.com/phaseluv")
                        bot.chat(`${dm} ${username} ` + "https://soundcloud.com/offhead-recordings")
                        break;
                    case "kill":
                        bot.chat("/kill");
                        break;
                    case "random":
                        bot.chat(randomString(30))
                        break;
                    case "tab":
                        bot.chat(`${dm} ${username} ` + getPlayerList(playerList));
                        break;
                    case "time":
                        if (bot.time.day >= 12541 && bot.time.day <= 23458) {
                            bot.chat(`${dm} ${username} ` + `the world time in ticks is ${bot.time.day} and you can sleep right now.`)
                        } else {
                            bot.chat(`${dm} ${username} ` + `the world time in ticks is ${bot.time.day}, and you can't sleep right now.`)
                        }
                        break;
                    case "coords":
                        bot.chat(`${dm} ${username} ` + `currently at ${bot.entity.position.toString()} :3`)
                        break;
                    default:
                        bot.chat(`${dm} ${username} ` + "that command does not exist lol")
                        break;
                }
            }

            cooldown.add("active")
            setTimeout(() => {
                cooldown.delete("active")
            }, config.minecraft.commandCooldown)
        }
    });
}
