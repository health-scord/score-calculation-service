const defaults = {
  RUN_INTERVAL: 30000,
  DATA_SERVICE_PORT: `9000`,
  DATA_SERVICE_URI: `data-service`
};

let config = {
  runInterval: process.env.RUN_INTERVAL
    ? process.env.RUN_INTERVAL
    : defaults.RUN_INTERVAL,
  dataServiceUri: process.env.DATA_SERVICE_URI
    ? process.env.DATA_SERVICE_URI
    : defaults.DATA_SERVICE_URI,
  dataServicePort: process.env.DATA_SERVICE_PORT
    ? process.env.DATA_SERVICE_PORT
    : defaults.DATA_SERVICE_PORT
};

module.exports = config;
