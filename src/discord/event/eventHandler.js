const {getTime} = require("../../core/functions")
let {eventCount,failedEventCount} = require("../../core/globalVars")

module.exports.eventHandler = function(client, bot){
	eventCount = 0;
	failedEventCount = 0;

	const fs = require('node:fs');
	const path = require('node:path');

	const foldersPath = path.join(__dirname, 'events');
	const eventFolder = fs.readdirSync(foldersPath);

	for (let folder of eventFolder) {
		let eventPath = path.join(foldersPath, folder);
		let eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));
		for (let file of eventFiles) {
			let filePath = path.join(eventPath, file); 
			eventCount++;
			try {
	        	var {eventModule} = require(`${filePath}`);
				eventModule(client, bot);
			} catch (err)  {
				console.error(err); 
				eventCount--;
				failedEventCount++;
			}
		}
	}

	console.log(`${getTime()} [discord] [eventHandler] ${eventCount} loaded, ${failedEventCount} not loaded.`)
}