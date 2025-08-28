const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('shows the in-game time'),
	async execute(interaction, bot) {
        let title = "";
        let moonPhase = "";
        if (bot.time.day >= 12541 && bot.time.day <= 23458) {
            title = "it is currently night time"
        } else {
            title = "it is currently day time"
        }

        switch (bot.time.moonPhase) {
            case 0:
                moonPhase = "Full Moon"
                break;
            case 1:
                moonPhase = "Waning Gibbous"
                break;
            case 2:
                moonPhase = "Third Quarter"
                break;
            case 3: 
                moonPhase = "Waning Crescent"
                break;
            case 4:
                moonPhase = "New Moon"
                break;
            case 5:
                moonPhase = "Waxing Crescent"
                break;
            case 6:
                moonPhase = "First Quarter"
                break;
            case 7:
                moonPhase = "Waxing Gibbous"
                break;
        }

		const embed = new EmbedBuilder()
	        .setColor(0xFF00FF)
	        .setTitle(title)
	        .setDescription("current time in ticks: ``"  + `${bot.time.timeOfDay}` + "``\n" + `current moon phase: ${moonPhase}\n`)
		await interaction.reply({embeds: [embed]});
	},
};
