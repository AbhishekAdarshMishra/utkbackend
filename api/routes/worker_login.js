const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Worker= require("../models/worker");
const bcryptjs= require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/',(req,res,next) => {
    Worker.find({worker_id: req.body.worker_id})
    .exec()
    .then(worker =>{
        if(worker.length < 1){
            return res.status(401).json({
                code:401,
                message: 'Auth failed'
            });
        }
        
            bcryptjs.compare(req.body.password,worker[0].password,(err,result)=>{
                if(err){
                    return res.status(200).json({
                        code:401,
                        message: 'Auth failed'
                    });
                }
                if(result){
                    const token =jwt.sign({
                        worker_id: worker[0].worker_id,
                        area: worker[0].area
                    },
                    
                    process.env.JWT_KEY,
                    {
                        expiresIn:"2h"
                    }
                    );
                return res.status(200).json({
                    code:200,
                    message: 'Auth successful',
                    token :token
                });
            }
            return res.status(200).json({
                code:401,
                message: 'Auth failed'
            });
            })        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
         

});

module.exports = router;
