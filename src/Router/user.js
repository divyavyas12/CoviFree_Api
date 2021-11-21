const express = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('bson')
const router = new express.Router()

router.post('/register' ,(req,res)=>{

    const obj = req.body

    User.updateOne( {_id: new ObjectId(obj.userId)}, 
        {$set: 
            {UserDetails: 
                {
                    name: obj.name, 
                    email: obj.email, 
                    aadhar: obj.aadhar, 
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

 
 router.post('/login' , (req,res,next)=>{
    
    User.find({mobile_no:req.body.mobile_no})
    .exec()
    .then(user=>{

        min = Math.ceil(100000);
        max = Math.floor(1000000);
        const token = Math.floor(Math.random() * (max - min + 1)) + min;

        if(user.length==1){

            User.updateOne({mobile_no: req.body.mobile_no}, {$set: {otp: token}}).then(() => {
                return res.status(200).json({
                    code: 200,
                    msg:'User already existed',
                    token: token
                })
            }).catch(() => {
                return res.status(201).json({
                    code:201,
                    status:"Something went wrong"
                })
            })
          

        }

       
         if(user.length<1){

            console.log(user)

           
            // const token = jwt.sign({
            //     mobile_no:user[0].mobile_no

            // },
            // 'this is dummy text',
            // {
            //     expiresIn:"1h"
            // }
            // );

            console.log('creating...');
            const obj = new User({
                mobile_no: req.body.mobile_no,
                otp: token
            })
            console.log('created...');
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


router.post('/verify' ,(req,res)=>{

    User.find({
        mobile_no: req.body.mobile_no
    }).then((user) => {

        console.log(user);
        console.log(user[0].otp, req.body.otp);

        if (user[0].otp == req.body.otp) {
            res.status(200).json({
                code: 200,
                status: 'success',
                msg: 'successfully login',
                userId: user[0]._id
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