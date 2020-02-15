const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inspector= require("../models/inspector");
const bcryptjs= require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/',(req,res,next) => {
    Inspector.find({inspector_id: req.body.inspector_id})
    .exec()
    .then(inspector =>{
        if(inspector.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        
            bcryptjs.compare(req.body.password,inspector[0].password,(err,result)=>{
                if(err){
                    return res.status(200).json({
                        message: 'Auth failed'
                    });
                }
                if(result){
                    const token =jwt.sign({
                        inspector_id: inspector[0].inspector_id,
                        area: inspector[0].area
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