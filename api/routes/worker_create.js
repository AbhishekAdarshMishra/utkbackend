const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Worker= require("../models/worker");
const bcryptjs= require('bcryptjs');


router.get('/',(req ,res ,next) => {
    Worker.find()
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


router.post('/',(req,res,next) => {
    Worker.find({worker_id: req.body.worker_id})
    .exec()
    .then(worker =>{
        if(worker.length >= 1){
            return res.status(200).json({
                code:409,
                message: 'Worker Id already exist'
            });
        }
        else{
            bcryptjs.hash(req.body.password,10,(err,hash)=>{
                if(err)
                {
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const worker =new Worker({
                        _id: new mongoose.Types.ObjectId(),
                        worker_id: req.body.worker_id,
                        password:hash,
                        area:req.body.area
                        
                    });
                    worker
                        .save()
                        .then(result =>{
                            res.status(200).json({
                                code:200,
                                message: 'worker Id created'
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

module.exports = router;