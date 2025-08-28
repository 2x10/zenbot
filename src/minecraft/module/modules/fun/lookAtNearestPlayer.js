module.exports.botModule = function(bot){
    bot.on('spawn', () => { 
        setInterval(() => {
            const playerFilter = (entity) => entity.type === 'player'
            const playerEntity = bot.nearestEntity(playerFilter)

            if (!playerEntity) return

            const pos = playerEntity.position.offset(0, playerEntity.height, 0)
            bot.lookAt(pos)
        }, 0);
    })
}
