const {MongoClient,ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'CoviFree'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{

    if(error)
    {
        console.log('Unable to connect to database')

    }
    
    const db = client.db(databaseName)
})
