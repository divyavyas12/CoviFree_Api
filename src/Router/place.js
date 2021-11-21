const express = require('express')
const Place = require('../models/place')
const { ObjectId } = require('bson')

const router = new express.Router()

router.post('/registerplace' ,(req,res)=>{

    const obj = req.body

    Place.updateOne( {_id: new ObjectId(obj.placeId)}, 
        {$set: 
            {PlaceDetails: 
                {
                    name: obj.name, 
                    email: obj.email, 
                    placepicture: obj.placepicture, 
                    address: obj.address
                }
            }
        }, function(err, doc) {
            console.log(err)
            console.log(doc);
            res.status(200).json({
                        code:200,
                        status:'success',
                        message:'successfully registered'
            
            })
        }
    );

    // user.save().then(()=>{

    //     res.status(200).json({
    //         code:200,
    //         status:'success',
    //         message:'successfully registered'


    //     })
       
 
    // }).catch((e)=>{
 
    //     res.status(201).json({
    //         code:201,
    //         status:"Something went wrong"
    //     })
//    })
 })


router.post('/loginplac' , (req,res,next)=>{
    
    console.log(req.body);

    Place.find({mobile_no:req.body.mobile_no})
    .exec()
    .then(place=>{

        min = Math.ceil(100000);
        max = Math.floor(1000000);
        const token = Math.floor(Math.random() * (max - min + 1)) + min;

        if(place.length==1){

            Place.updateOne({mobile_no: req.body.mobile_no}, {$set: {otp: token}}).then(() => {
                return res.status(200).json({
                    code: 200,
                    msg:'Place already existed',
                    token: token
                })
            }).catch(() => {
                return res.status(201).json({
                    code:201,
                    status:"Something went wrong"
                })
            })
          

        }

       
         if(place.length<1){

            console.log(place)

           
            // const token = jwt.sign({
            //     mobile_no:user[0].mobile_no

            // },
            // 'this is dummy text',
            // {
            //     expiresIn:"1h"
            // }
            // );

            console.log('creating...');
            const obj = new Place({
                mobile_no: req.body.mobile_no,
                otp: token
            })
            console.log('created...', obj);
            obj.save().then(() => {
                console.log('saved...');
                res.status(200).json({
                    code:200,
                    msg:'Create new User',
                    token:token
                })
            }).catch((error) => {
                console.log('error...');
                res.status(201).json({
                    code:201,
                    status:"Something went wrong"
                })
            })
           


        }

    }).catch(err=>{
        console.log('ERROR')
        res.status(201).json({
            code:201,
            status:"Something went wrong"
        })
    })
})



router.post('/verifyPlace' ,(req,res)=>{

    Place.find({
        mobile_no: req.body.mobile_no
    }).then((place) => {

        console.log(place);
        console.log(place[0].otp, req.body.otp);

        if (place[0].otp == req.body.otp) {
            res.status(200).json({
                code: 200,
                status: 'success',
                msg: 'successfully login',
                userId: place[0]._id
            })
        } else {
            res.status(201).json({
                code:201,
                status:"Invalid OTP"
            })
        }
    

 
    }).catch((e)=>{
 
     res.status(201).json({
        code:201,
        status:"Something went wrong"
    })
   })
 })



 module.exports = router
