const {getTime} = require("../../core/functions")
let {moduleCount,failedModuleCount} = require("../../core/globalVars")

module.exports.moduleHandler = function(bot){
	moduleCount = 0;
	failedModuleCount = 0;

	const fs = require('node:fs');
	const path = require('node:path');

	const foldersPath = path.join(__dirname, 'modules');
	const moduleFolder = fs.readdirSync(foldersPath);

	for (let folder of moduleFolder) {
		let modulePath = path.join(foldersPath, folder);
		let moduleFiles = fs.readdirSync(modulePath).filter(file => file.endsWith('.js'));
		for (let file of moduleFiles) {
			let filePath = path.join(modulePath, file); 
			moduleCount++;
			try {
	        	var {botModule} = require(`${filePath}`);
				botModule(bot);
			} catch (err)  {
				console.error(err); 
				moduleCount--;
				failedModuleCount++;
			}
		}
	}

	console.log(`${getTime()} [minecraft] [moduleHandler] ${moduleCount} loaded, ${failedModuleCount} not loaded.`)
}