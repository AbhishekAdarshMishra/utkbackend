const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Restroom= require("../models/restroom");
const bcryptjs= require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/',(req,res,next) => {
    Restroom.find({restroom_id: req.body.restroom_id})
    .exec()
    .then(restroom =>{
        if(restroom.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        
            bcryptjs.compare(req.body.password,restroom[0].password,(err,result)=>{
                if(err){
                    return res.status(200).json({
                        message: 'Auth failed'
                    });
                }
                if(result){
                    const token =jwt.sign({
                        restroom_id: restroom[0].restroom_id,
                        area: restroom[0].area,
                        rating: restroom[0].rating
                    },
                    
                    process.env.JWT_KEY,
                    {
                        expiresIn:"2h"
                    }
                    );
                return res.status(200).json({
                    message: 'Auth successful',
                    token :token
                });
            }
            return res.status(200).json({
                message: 'Auth failed'
            });
            })        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
         

});

module.exports = router;