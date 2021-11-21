const mongoose = require('mongoose')
const validator = require('validator')

TravelHistorySchema = new mongoose.Schema({

    userId:{
        type: String

    },

    placeId:{

        type:String

    },
  
    dateTime:{
        type: String,
        
    }
  
})

const Travel = mongoose.model('TravelHistory', TravelHistorySchema)


module.exports = Travel

