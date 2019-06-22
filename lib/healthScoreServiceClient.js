const Promise = require("bluebird");

class healthScoreServiceClient {
  constructor(options) {
    this.options = options;
    this.name = `dataServiceClient`;
    console.log(`${this.name} is operational`);
  }

  async getHealthScore(data) {
    try {
      await Promise.delay(1000);

      let max = 1000;
      let min = 500;
      let healthScore = Math.floor(Math.random() * (max - min + 1) + min);

      return Promise.resolve(healthScore);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

module.exports = healthScoreServiceClient;
