const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Restroom= require("../models/restroom");
const bcryptjs= require('bcryptjs');



router.post('/',(req,res,next) => {
    Restroom.find({restroom_id: req.body.restroom_id})
    .exec()
    .then(restroom =>{
        if(restroom.length >= 1){
            return res.status(200).json({
                message: 'Restroom Id already exist',
                code:409
            });
        }
        else{
            bcryptjs.hash(req.body.password,10,(err,hash)=>{
                if(err)
                {
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const restroom =new Restroom({
                        _id: new mongoose.Types.ObjectId(),
                        restroom_id: req.body.restroom_id,
                        password:hash,
                        area:req.body.area,
                        rating:req.body.rating,
                        count:req.body.count,
                        mailsuper:req.body.mailsuper
                        
                    });
                    restroom
                        .save()
                        .then(result =>{
                            res.status(200).json({
                                code:200,
                                message: 'Restroom created'
                            });
    
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
            
        });

        }
    })
         
});

module.exports = router;