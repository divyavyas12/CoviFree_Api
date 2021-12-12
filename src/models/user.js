const mongoose = require('mongoose')
const validator = require('validator')

UserSchema = new mongoose.Schema({
    
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

   UserDetails:{

    status:{
        type:String,
        default:"Negative"

    },

    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true

    },
    aadhar:{
        type:String,
        unique:true

    },
    address:{
        type:String,

    }

   }
})


UserSchema.statics.findByCredentials= async (mobile_no)=>{

    const user = await  User.findOne( {mobile_no} )
    if(!user){
        throw new Error('New User Created ')
    }
    else{
         console.log('Existing User')
    }

   
    return user
}


const User = mongoose.model('User',UserSchema)


module.exports = User