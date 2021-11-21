const mongoose = require('mongoose')
const validator = require('validator')

PlaceSchema = new mongoose.Schema({
    
    mobile_no:{
        type: String,
        unique:true,
       
    },
    otp:{
        type: String,
        

    },
   verified:{
       type:Boolean,
    
   },

   PlaceDetails:{

    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true

    },
    placepicture:{
        type:String,

    },
    address:{

        
       

    }

   }
})


const Place = mongoose.model('Place',PlaceSchema)


module.exports = Place