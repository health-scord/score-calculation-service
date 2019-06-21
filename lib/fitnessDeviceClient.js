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

  async getProfileDetails(account) {
    try {
      console.log(account);
      let token = account.devices[0].accessToken;

      let response = await this.fitbitClient.get("/profile.json", token);

      console.log("RIGHT HERE>>>>>>>>>");
      console.log(response);
      console.log(response[0]);

      //return Promise.resolve(profileDetails);
    } catch (error) {
      console.log("ERROR>>>>>>>>>");
      console.log(error);
      //process.exit();
      //return Promise.reject(error);
    }
  }

  async authenticate(account) {
    try {
      console.log("calling authenticate method");
      let authResponse = this.webApiClient.getAuthorizeUrl(
        "activity heartrate location nutrition profile settings sleep social weight",
        "https://157.230.2.203:443/callback"
      );
      console.log(`got an authResponse:`);
      console.log(authResponse);
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

module.exports = fitnessDeviceClient;
