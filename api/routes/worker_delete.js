const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Worker= require("../models/worker");

router.post('/:worker_id',(req,res,next) =>{
    const id=req.params.worker_id;
    Worker.remove({worker_id:id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});

module.exports = router;
