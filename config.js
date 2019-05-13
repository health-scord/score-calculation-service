const defaults = {
    RUN_INTERVAL:3000
}

let config = {
    runInterval: process.env.RUN_INTERVAL ? process.env.RUN_INTERVAL : defaults.RUN_INTERVAL
}

module.exports = config