const defaults = {
  RUN_INTERVAL: 3000,
  DATA_SERVICE_ENDPOINT: `http://68.183.100.145:5000`
};

let config = {
  runInterval: process.env.RUN_INTERVAL
    ? process.env.RUN_INTERVAL
    : defaults.RUN_INTERVAL,
  dataServiceEndpoint: process.env.DATA_SERVICE_ENDPOINT
    ? process.env.DATA_SERVICE_ENDPOINT
    : defaults.DATA_SERVICE_ENDPOINT
};

module.exports = config;
