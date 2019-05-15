const Promise = require("bluebird");
const rp = require("request-promise")
const FitbitApiClient = require("fitbit-node");
const express = require("express");

class fitnessDeviceClient {
    constructor(options){
        this.options = options
        this.name = `fitnessDeviceClient`
        console.log(`${this.name} is operational`)

        this.webApiClient = new FitbitApiClient({
            clientId: "22DPF6",
            clientSecret: "130867304fbc7fa872c2e3c059eb0940",
            apiVersion: '1.2' // 1.2 is the default
        });

        this.authApi = express();

        // handle the callback from the Fitbit authorization flow
        this.authApi.get("/callback", (req, res) => {

            console.log('callbackroute is working!!!')
            // exchange the authorization code we just received for an access token
            this.webApiClient.getAccessToken(req.query.code, 'https://157.230.2.203:3000/callback').then(result => {
                // use the access token to fetch the user's profile information
                this.webApiClient.get("/profile.json", result.access_token).then(results => {
                    res.send(results[0]);
                }).catch(err => {
                    res.status(err.status).send(err);
                });
            }).catch(err => {
                res.status(err.status).send(err);
            });
        });

        // launch the server
        this.authApi.listen(443);

    }

    async getData(account){
        try{

            let authenticated = await this.authenticate(account)

            if(authenticated){
                //fetch data from web api 

                let data = []
                return Promise.resolve(data)

            } else{
                return Promise.reject('Could not authenticate')
            }

        } catch(error){
            console.log(error)
            return Promise.reject(error)
        }
    }

    async authenticate(account){
        try{
            let authResponse = this.webApiClient.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'https://157.230.2.203:3000/callback')
            console.log(authResponse)
            return Promise.resolve(true)
        } catch(error){
            console.log(error)
            return Promise.reject(error)
        }
    }




   

}

module.exports = fitnessDeviceClient


function getRandomNumber(low, high) {
    var r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
}
