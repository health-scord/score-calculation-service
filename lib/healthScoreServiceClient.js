const Promise = require("bluebird");

class healthScoreServiceClient {
  constructor(options) {
    this.options = options;
    this.name = `dataServiceClient`;
    console.log(`${this.name} is operational`);
  }

  async calculateHealthScore(data) {
    try {
      console.log(data);
      const heartScore = calculateHeartScore(data.restingHeartRate);
      const sleepScore = calculateSleepScore(data.averageDailySleep);
      const activityScore = calculateActivityScore(data.averageDailyActivity);

      console.log(`heartScore is: ${heartScore}`);
      console.log(`sleepScore is: ${sleepScore}`);
      console.log(`activityScore is: ${activityScore}`);

      let healthScore = heartScore + sleepScore + activityScore;

      console.log(`healthScore is: ${healthScore}`);

      return Promise.resolve(healthScore);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

const calculateHeartScore = restingHeartRate => {
  if (restingHeartRate > 140) {
    restingHeartRate = 140;
  }

  if (restingHeartRate < 140) {
    restingHeartRate = 40;
  }

  const heartScore =
    100 - Math.floor(Math.abs(restingHeartRate - 40) / 100) * 100 + 100;

  return heartScore;
};

const calculateActivityScore = averageDailyActivity => {
  if (averageDailyActivity > 300) {
    averageDailyActivity = 300;
  }

  if (averageDailyActivity < 150) {
    averageDailyActivity = 150;
  }

  const activityScore =
    150 - Math.floor(Math.abs(averageDailyActivity - 300) / 150) * 100 + 150;
  return activityScore;
};

const calculateSleepScore = averageDailySleep => {
  let sleepScore;

  if (averageDailySleep > 7 || averageDailySleep < 9) {
    sleepScore = 300;
  } else if (averageDailySleep < 7) {
    sleepScore = Math.floor(
      200 - (Math.abs(7 - averageDailySleep) / 7) * 200 + 100
    );
  } else if (averageDailySleep > 9) {
    sleepScore = Math.floor(
      200 - (Math.abs(9 - averageDailySleep) / 7) * 200 + 100
    );
  }

  return sleepScore;
};

module.exports = healthScoreServiceClient;
