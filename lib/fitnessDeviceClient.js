const Promise = require("bluebird");
const rp = require("request-promise");
const FitbitApiClient = require("fitbit-node");
const express = require("express");
const moment = require("moment");

const apiPath = {
  sleep: "/sleep/",
  activity: "/activities/tracker/minutesVeryActive/",
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
      const { startDate, endDate } = calculateTimeFrame(100);

      let [sleepData, activityData, heartRateData] = await Promise.all([
        retrieveData(account, this.fitbitClient, startDate, endDate, "sleep"),
        retrieveData(
          account,
          this.fitbitClient,
          startDate,
          endDate,
          "activity"
        ),
        retrieveData(account, this.fitbitClient, startDate, endDate, "heart")
      ]);

      let averageDailySleep = calculateAverageDailySleep(sleepData.sleep);
      let averageDailyActivity = calculateAverageDailyActivity(
        activityData["activities-tracker-minutesLightlyActive"]
      );
      let restingHeartRate = calculateRestingHeartRate(
        heartRateData["activities-heart"]
      );

      return {
        averageDailySleep,
        averageDailyActivity,
        restingHeartRate
      };
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

const calculateTimeFrame = delta => {
  let now = moment();
  let startDate = now.clone().subtract(delta, "days");

  let endDateFormatted = now.format().slice(0, 10);
  let startDateFormatted = startDate.format().slice(0, 10);

  return { startDate: startDateFormatted, endDate: endDateFormatted };
};

const calculateAverageDailySleep = sleepData => {
  let dates = sleepData.map(dataPoint => {
    return dataPoint.dateOfSleep;
  });

  let uniqueDates = [...new Set(dates)];

  let totalSleep = 0;

  for (let date of uniqueDates) {
    let dateSleepData = sleepData.filter(dataPoint => {
      return dataPoint.dateOfSleep == date;
    });

    let totalSleepOnDate = 0;
    for (let sleepData of dateSleepData) {
      totalSleepOnDate = totalSleepOnDate + sleepData.minutesAsleep;
    }
    totalSleep = totalSleep + totalSleepOnDate;
  }

  return parseFloat(totalSleep / uniqueDates.length).toFixed(2);
};

const calculateAverageDailyActivity = activityData => {
  let totalActiveMinutes = 0;

  for (let date of activityData) {
    totalActiveMinutes = totalActiveMinutes + parseInt(date.value);
  }

  return parseFloat(totalActiveMinutes / activityData.length).toFixed(2);
};

const calculateRestingHeartRate = heartData => {
  let releventData = heartData.filter(dataPoint => {
    return dataPoint.value.restingHeartRate;
  });

  let heartRateSum = 0;
  for (let dataPoint of releventData) {
    heartRateSum = heartRateSum + parseInt(dataPoint.value.restingHeartRate);
  }

  return parseFloat(heartRateSum / releventData.length).toFixed(2);
};
