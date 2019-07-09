const Promise = require("bluebird");
const rp = require("request-promise");
const FitbitApiClient = require("fitbit-node");
const express = require("express");
const moment = require("moment");

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

      console.log(`startDate: ${startDate}`);
      console.log(`endDate: ${endDate}`);

      let userData = await Promise.all([
        //getHeartData(account, this.fitbitClient),
        getFitnessActivityData(account, this.fitbitClient, startDate, endDate)
        //getSleepData(account, this.fitbitClient)
      ]);

      return userData;
    } catch (error) {
      console.log("ERROR>>>>>>>>>");
      console.log(error);
      //return Promise.reject(error)
    }
  }
}

module.exports = fitnessDeviceClient;

let getHeartData = async (account, deviceClient) => {
  let token = account.devices[0].accessToken;

  let response = await deviceClient.get(
    "/activities/heart/date/2019-06-21.json",
    token
  );

  //console.log(JSON.stringify(response[0]));

  return response[0];
};

let getFitnessActivityData = async (account, deviceClient) => {
  let token = account.devices[0].accessToken;

  let response = await deviceClient.get(
    `/activities/activityCalories/date/${startDate}/${endDate}.json`,
    token
  );

  //console.log(JSON.stringify(response[0]));

  return response[0];
};

let getSleepData = async (account, deviceClient) => {
  let token = account.devices[0].accessToken;

  let response = await deviceClient.get("/sleep/date/2019-06-21.json", token);

  //console.log(JSON.stringify(response[0]));

  return response[0];
};

let calculateTimeFrame = () => {
  let now = moment();
  let startDate = now.clone().subtract(365, "days");

  let endDateFormatted = now.format().slice(0, 10);
  let startDateFormatted = startDate.format().slice(0, 10);

  return { startDate: startDateFormatted, endDate: endDateFormatted };
};
