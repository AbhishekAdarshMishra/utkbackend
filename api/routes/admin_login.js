const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin= require("../models/admin");
const bcryptjs= require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/',(req,res,next) => {
    Admin.find({admin_id: req.body.admin_id})
    .exec()
    .then(admin =>{
        if(admin.length < 1){
            return res.status(401).json({
                code:401,
                message: 'Auth failed'
            });
        }
        
            bcryptjs.compare(req.body.password,admin[0].password,(err,result)=>{
                if(err){
                    return res.status(200).json({
                        code:401,
                        message: 'Auth failed'
                    });
                }
                if(result){
                    const token =jwt.sign({
                        admin_id: admin[0].admin_id,
                        password: admin[0].password,
                        superauth: admin[0].superauth
                    },
                    
                    process.env.JWT_KEY,
                    {
                        expiresIn:"2h"
                    }
                    );
                return res.status(200).json({
                    code:200,
                    message: 'Auth successful',
                    token :token
                });
            }
            return res.status(200).json({
                code:401,
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