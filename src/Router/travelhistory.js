const express = require('express')
const Travel = require('../models/travelhistory')
const { ObjectId } = require('bson')

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
              

 })



 
 router.get('/getHistory',(req,res)=>{
 
    Travel.find({}).then((travel)=>{

        res.send(travel)

    }).catch((e)=>{

        res.status(500).send()

    })

})
 



module.exports = router