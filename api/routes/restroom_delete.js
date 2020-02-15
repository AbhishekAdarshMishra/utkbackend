const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Restroom= require("../models/restroom");


router.post('/:restroom_id',(req,res,next) =>{
    const id=req.params.restroom_id;
    Restroom.remove({restroom_id:id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});

module.exports = router;