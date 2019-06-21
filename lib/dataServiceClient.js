const Promise = require("bluebird");
const rp = require("request-promise");

class dataServiceClient {
  constructor(options) {
    this.options = options;
    this.name = `dataServiceClient`;
    console.log(`${this.name} is operational`);
  }

  async getAccounts() {
    try {
      let options = {
        uri: `${this.options.dataServiceEndpoint}/accounts`,
        qs: {},
        headers: {
          "User-Agent": "Request-Promise"
        },
        json: true
      };

      let accounts = "default";
      try {
        accounts = await rp(options);
      } catch (error) {
        console.log(error);
      }

      // let accounts = [
      //     {
      //         firstName: 'Mike',
      //         lastName: 'Beele'
      //     },
      //     {
      //         firstName: 'Danny',
      //         lastName: 'Green'
      //     }, {
      //         firstName: 'Julia',
      //         lastName: 'Roberts'
      //     }
      // ]

      return Promise.resolve(accounts);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async updateHealthScore(account, healthScore) {
    try {
      // code here to post to accounts with health score for given account id

      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

module.exports = dataServiceClient;
