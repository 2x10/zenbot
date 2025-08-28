module.exports.botModule = function(bot){
    bot.on('spawn', async() => {
        //bot.chatAddPattern(/^\[.*?(\w*) -> me \] (.*)$/, "whisper");
        bot.chatAddPattern(/^.*?(\w*) wants (?:to teleport to you|that you teleport to them)\.$/, "tpRequest", "0b0t");
        //bot.chatAddPattern(/Ignored: */, "ignoreList");
        })
}
