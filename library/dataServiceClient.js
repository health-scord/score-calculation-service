const Promise = require("bluebird");


class dataServiceClient {
    constructor(options){
        this.options = options
        this.name = `dataServiceClient`
        console.log(`${this.name} is operational`)

    }


    async getAccounts(){
        try{

            let accounts = [
                {
                    firstName: 'Mike',
                    lastName: 'Beele'
                },
                {
                    firstName: 'Danny',
                    lastName: 'Green'
                }, {
                    firstName: 'Julia',
                    lastName: 'Roberts'
                }
            ]

            return Promise.resolve(accounts)

        } catch(error){
            console.log(error)
            return Promise.reject(error)
        }
    }

    async updateHealthScore(account, healthScore){
        try{
            return Promise.resolve(true)
        } catch(error){
            console.log(error)
            return Promise.reject(error)
        }
    }
}

module.exports = dataServiceClient
