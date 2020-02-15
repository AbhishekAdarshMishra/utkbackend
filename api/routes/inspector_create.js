const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Inspector= require("../models/inspector");
const bcryptjs= require('bcryptjs');


router.get('/',(req ,res ,next) => {
    Inspector.find()
    .exec()
    .then(docs =>{
        //console.log(docs);
        const response =docs
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        req.status(500).json({
            error:err
        });
    });
});
router.post('/',(req,res,next) => {
    Inspector.find({inspector_id: req.body.inspector_id})
    .exec()
    .then(inspector =>{
        if(inspector.length >= 1){
            return res.status(200).json({
                code:409,
                message: 'Inspector Id already exist'
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
                    const inspector =new Inspector({
                        _id: new mongoose.Types.ObjectId(),
                        inspector_id: req.body.inspector_id,
                        password:hash,
                        area:req.body.area
                        
                    });
                    inspector
                        .save()
                        .then(result =>{
                            res.status(200).json({
                                code:200,
                                message: 'Inspector Id created'
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