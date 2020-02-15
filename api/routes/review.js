const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review= require("../models/review");



router.post('/',(req,res,next)=>{

    const review = new Review({
        _id: new mongoose.Types.ObjectId(),
        rating: req.body.rating,
        reason: req.body.reason,
        restroom_id: req.body.restroom_id,
        area: req.body.area
    });
    review
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Review Successfully Submitted',
            Review: //result
            {
                rating: result.rating,
                reason : result.reason,
                restroom_id : result.restroom_id,
                area : result.area,
                _id: result._id,
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    
});

module.exports = router;