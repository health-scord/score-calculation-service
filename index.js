const config = require("./config.js");
const DataServiceClient = require("./lib/dataServiceClient.js");

const FitnessDeviceClient = require("./lib/fitnessDeviceClient");
const HealthScoreServiceClient = require("./lib/healthScoreServiceClient");

const dataServiceClient = new DataServiceClient(config);
const fitnessDeviceClient = new FitnessDeviceClient(config);
const healthScoreServiceClient = new HealthScoreServiceClient(config);

const main = async () => {
  try {
    console.log("generating health score for all accounts");
    let accounts = await dataServiceClient.getAccounts();

    console.log(`Fetched ${accounts.length} accounts from data-service:`);

    for (let account of accounts) {
      console.log("");
      let data = await fitnessDeviceClient.getData(account);

      PrettyPrintJsonConsole(JSON.stringify(data));

      console.log("");

      console.log(
        `calculating health score for ${account.firstName} ${
          account.lastName
        } from device data`
      );
      let healthScore = await healthScoreServiceClient.calculateHealthScore(
        data
      );

      console.log(
        `user ${account.firstName} ${
          account.lastName
        } has a calculated health score of ${healthScore}`
      );

      console.log(
        `posting ${account.firstName} ${
          account.lastName
        }'s data to data-service`
      );

      await dataServiceClient.updateHealthScore(account, healthScore);

      console.log(
        `user ${account.firstName} ${
          account.lastName
        }'s health score of ${healthScore} was succcessfully updated`
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      main();
    }, config.runInterval);
  }
};

main();

function PrettyPrintJsonConsole(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, "\t");
  }

  var arr = [],
    _string = "color:green",
    _number = "color:darkorange",
    _boolean = "color:blue",
    _null = "color:magenta",
    _key = "color:red";

  json = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function(match) {
      var style = _number;
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          style = _key;
        } else {
          style = _string;
        }
      } else if (/true|false/.test(match)) {
        style = _boolean;
      } else if (/null/.test(match)) {
        style = _null;
      }
      arr.push(style);
      arr.push("");
      return "%c" + match + "%c";
    }
  );

  arr.unshift(json);

  console.log.apply(console, arr);
}
