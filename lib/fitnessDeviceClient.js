const Promise = require("bluebird");
const rp = require("request-promise");
const FitbitApiClient = require("fitbit-node");
const express = require("express");
const moment = require("moment");

const apiPath = {
  sleep: "/sleep/",
  activity: "/activities/activityCalories/",
  heart: "/activities/heart/"
};

class fitnessDeviceClient {
  constructor(options) {
    this.options = options;
    this.name = `fitnessDeviceClient`;
    console.log(`${this.name} is operational`);

    this.fitbitClient = new FitbitApiClient({
      clientId: "22DPF6",
      clientSecret: "5f3538567d187a52768935217b220558",
      apiVersion: "1.2"
    });
  }

  async getData(account) {
    try {
      const { startDate, endDate } = calculateTimeFrame();

      let [sleepData, activityData, heartRateData] = await Promise.all([
        retrieveData(account, this.fitbitClient, startDate, endDate, "sleep")
        // retrieveData(
        //   account,
        //   this.fitbitClient,
        //   startDate,
        //   endDate,
        //   "activity"
        // ),
        // retrieveData(account, this.fitbitClient, startDate, endDate, "heart")
      ]);

      // console.log("heartRateData:");
      // console.log(JSON.stringify(heartRateData));
      // console.log("");

      // console.log("activityData:");
      // console.log(JSON.stringify(activityData));
      // console.log("");

      // console.log("sleepData:");
      // console.log(JSON.stringify(sleepData));
      // console.log("");

      console.log(sleepData);

      let averageDailySleep = calculateAverageDailySleep(sleepData);
      // let averageDailyActivity = calculateAverageDailyActivity(activityData);
      // let averageRestingHeartRate = calculateAverageHeartRate(heartRateData);

      return "";

      // return {
      //   averageDailySleep,
      //   averageDailyActivity,
      //   averageRestingHeartRate
      // };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = fitnessDeviceClient;

let retrieveData = async (
  account,
  deviceClient,
  startDate,
  endDate,
  dataType
) => {
  let token = account.devices[0].accessToken;

  try {
    let response = await deviceClient.get(
      `${apiPath[dataType]}date/${startDate}/${endDate}.json`,
      token
    );
    return response[0];
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

let calculateTimeFrame = () => {
  let now = moment();
  let startDate = now.clone().subtract(100, "days");

  let endDateFormatted = now.format().slice(0, 10);
  let startDateFormatted = startDate.format().slice(0, 10);

  return { startDate: startDateFormatted, endDate: endDateFormatted };
};

let calculateAverageDailySleep = sleepData => {
  let dates = sleepData.map(dataPoint => {
    return dataPoint.dateOfSleep;
  });

  let uniqueDates = [...new Set(dates)];

  for (let date of uniqueDates) {
    let dateSleepData = sleepData.filter(dataPoint => {
      return dataPoint.dateOfSleep == date;
    });

    let totalSleep = 0;
    for (let sleepData of dateSleepData) {
      totalSleep = totalSleep + sleepData.minutesAsleep;
    }

    console.log(`minutes slept on ${date}: ${totalSleep}`);
  }
};
