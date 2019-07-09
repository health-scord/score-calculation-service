const Promise = require("bluebird");
const rp = require("request-promise");
const FitbitApiClient = require("fitbit-node");
const express = require("express");
const moment = require("moment");

const apiPath = {
  heart: "/activities/heart/",
  activity: "/activities/activityCalories/",
  sleep: "/sleep/"
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

      let userData = await Promise.all([
        retrieveData(account, this.fitbitClient, startDate, endDate, "activity")
      ]);

      console.log(userData);

      return userData;
    } catch (error) {
      //return Promise.reject(error)
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
  let startDate = now.clone().subtract(365, "days");

  let endDateFormatted = now.format().slice(0, 10);
  let startDateFormatted = startDate.format().slice(0, 10);

  return { startDate: startDateFormatted, endDate: endDateFormatted };
};
