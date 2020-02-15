const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Restroom = require('../models/restroom');


router.get('/',(req ,res ,next) => {
    Restroom.find()
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



router.post('/:restroom_id',(req ,res ,next) => {
    Restroom.find({restroom_id:req.params.restroom_id})
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


module.exports = router;