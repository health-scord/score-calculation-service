const Promise = require("bluebird");
const rp = require("request-promise");
const FitbitApiClient = require("fitbit-node");
const express = require("express");

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
      let userData = await Promise.all([
        getHeartData(account, this.fitbitClient),
        getFitnessActivityData(account, this.fitbitClient),
        getSleepData(account, this.fitbitClient)
      ]);

      console.log(userData);

      return Promise.resolve([...userData[0], ...userData[1], userData[2]]);
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

  console.log(response);

  return response[0];
};

let getFitnessActivityData = async (account, deviceClient) => {
  let token = account.devices[0].accessToken;

  let response = await deviceClient.get(
    "/activities/date/2019-06-21.json",
    token
  );

  console.log(response);

  return response[0];
};

let getSleepData = async (account, deviceClient) => {
  let token = account.devices[0].accessToken;

  let response = await deviceClient.get("/sleep/date/2019-06-21.json", token);

  console.log(response);

  return response[0];
};
