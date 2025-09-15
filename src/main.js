const {getTime} = require("./core/functions")
const packageInfo = require("../package.json")
const { Worker, MessageChannel } = require('worker_threads');

// hi :3
// uhm yeah

console.log(`${getTime()} [main] thank you for using ${packageInfo.name} version ${packageInfo.version}! initiating startup sequence.`);

init()

function init() {
    let { port1, port2 } = new MessageChannel()
    try {
        let worker = new Worker('./src/worker.js')
        port1.on("message", message => {
            switch (message)
            {
                case "restart":
                    worker.terminate();
                    init();
                    break;
                case "exit":
                    worker.terminate();
                    process.exit();
            }
        })
        worker.postMessage({ port: port2}, [port2])
    } catch (err) {
        console.log(err)
    }
}