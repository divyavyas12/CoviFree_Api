
const express = require('express')
const Report = require('../models/reportplace')
const { ObjectId } = require('bson')

const router = new express.Router()


router.post('/reportPlace' ,(req,res)=>{

    const obj = req.body
    console.log(obj);

    const report = new Report({
        userId: obj.userId,
        placeId: obj.placeId,
        reportTitle: obj.reportTitle,
        reportDesc: obj.reportDesc,
        dateTime: obj.dateTime
    })

    report.save().then(() => {
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


 router.get('/getReport',(req,res)=>{
 
    Report.find({}).then((report)=>{

        res.send(report)

    }).catch((e)=>{

        res.status(500).send()

    })

})
 



module.exports = router

