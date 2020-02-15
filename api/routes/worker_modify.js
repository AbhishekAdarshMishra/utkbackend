const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Worker= require("../models/worker");



router.post('/:worker_id',(req,res,next) =>{
    const id = req.params.worker_id;
    const updateOps ={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Worker.update({worker_id:id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
        })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
