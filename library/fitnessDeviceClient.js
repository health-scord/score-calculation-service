const Promise = require("bluebird");


class fitnessDeviceClient {
    constructor(options){
        this.options = options
        this.name = `fitnessDeviceClient`
        console.log(`${this.name} is operational`)

    }


    async heartbeat(){
        try{

        } catch(error){
            console.log(error)
            return Promise.reject(error)
        }
    }

    async getData(account){
        try{

            let data = true

            return Promise.resolve(data)
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
