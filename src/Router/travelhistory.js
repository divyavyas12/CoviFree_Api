const express = require('express')
const Travel = require('../models/travelhistory')
const Place = require('../models/place')
const User = require('../models/user')
const { ObjectId } = require('bson')
const { db } = require('../models/place')

const router = new express.Router()

router.post('/updateHistory' ,(req,res)=>{

    const obj = req.body
    console.log(obj);

    const travel = new Travel({
        userId: obj.userId,
        placeId: obj.placeId,
        dateTime: obj.dateTime
    })

    travel.save().then(() => {
                    return res.status(200).json({
                        code: 200,
                        status:'success',
                        msg:'Successfully Updated',
                        
                    })
                }).catch(() => {
                    return res.status(201).json({
                        code:201,
                        status:"Something went wrong"
                    })
                })
             //JSONException: Value <!DOCTYPE of type java.lang.String cannot be converted to JSONObject 

 })



 
 router.get('/getHistory',(req,res)=>{
 
    Travel.find({}).then((travel)=>{

        values = []
        count = 0
        travel.forEach(element => {
            placeName = ''
            userMobile = ''
            var promises = [];
            promises.push(Place.find({_id : ObjectId(element.placeId)}).lean().exec());
            promises.push(User.find({_id : ObjectId(element.userId)}).lean().exec());

            Promise.all(promises).then(results=>{
                console.log(results)
                // results[0] will have docs of first query
                // results[1] will have docs of second query
                // and so on...

                value = {
                    placeName:'hii'
                }

                console.log(value)

                values.push(value)
            
                // you can combine all the results here and send back in response
                if (values.length == travel.length) {
                    res.status(200).json({
                        status: 200,
                        values: values,
                    })
                }
            }).catch(err=>{
                //handle error here
            })
                    
        });

      


    }).catch((e)=>{

        res.status(500).send()

    })

})


module.exports = router