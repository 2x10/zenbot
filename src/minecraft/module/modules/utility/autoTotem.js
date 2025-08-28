module.exports.botModule = function(bot){
    bot.on('spawn', () => { 
        const totemId = bot.registry.itemsByName.totem_of_undying.id 
        if (bot.registry.itemsByName.totem_of_undying){
            setInterval(() => {
                const totem = bot.inventory.findInventoryItem(totemId, null)
                if (totem && bot.inventory.slots[bot.getEquipmentDestSlot('off-hand')] == null) {
                    bot.equip(totem, 'off-hand')
                }
            }, 0)
        }
    })
}
