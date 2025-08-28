const {getRandomNumber} = require("../../../../core/functions")

module.exports.botModule = function(bot){
    bot.on('spawn', () => {
        setInterval(() => {
            bot.swingArm(hand='right');
        }, getRandomNumber(3000, 25000))
    })

    bot.on('spawn', () => {
        setInterval(() => {
            bot.swingArm(hand='left');
        }, getRandomNumber(2500, 25000))
    })

    bot.on('spawn', () => {
        setInterval(() => {
            bot.setControlState('jump', true)
            bot.waitForTicks(10);
            bot.setControlState('jump', false)
        }, getRandomNumber(25000, 55505))
    })
}

