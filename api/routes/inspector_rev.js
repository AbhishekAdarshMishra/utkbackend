const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const InspectorRev= require("../models/inspector_rev");

router.get('/',(req ,res ,next) => {
    InspectorRev.find()
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



router.post('/',(req,res,next)=>{

    const review = new InspectorRev({
        _id: new mongoose.Types.ObjectId(),
        inspector_id:req.body.inspector_id,
        restroom_id: req.body.restroom_id,
        area: req.body.area,
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5,
        q6: req.body.q6,
        q7: req.body.q7,
        q8: req.body.q8,
        q9: req.body.q9,
        q10: req.body.q10
    });
    review
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Review Successfully Submitted',
            Review: //result
            {
                inspector_id : result.inspector_id,
                restroom_id : result.restroom_id,
                area : result.area,
                _id: result._id,
                q1: result.q1,
                 q2: result.q2,
                 q3: result.q3,
                 q4: result.q4,
                 q5: result.q5,
                 q6: result.q6,
                 q7: result.q7,
                 q8: result.q8,
                 q9: result.q9,
                 q10: result.q10
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

router.get('/:restroom_id',(req,res,next) =>{
        const id=req.params.restroom_id;
        InspectorRev.find({restroom_id:id})
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

    router.post('/:inspector_id',(req,res,next) =>{
            const id=req.params.inspector_id;
            InspectorRev.find({inspector_id:id})
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


module.exports = router;