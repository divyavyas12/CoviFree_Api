const mongoose = require('mongoose')
const validator = require('validator')

ReportPlaceSchema = new mongoose.Schema({

      userId:{

        type:String

      },
      placeId:{

        type:String
      },

        reportTitle:{
            type:String

        },

        reportDesc:{
            type:String


        },
        dateTime:{
            type:String

        }

})

const Report = mongoose.model('ReportPlace',ReportPlaceSchema)


module.exports = Report