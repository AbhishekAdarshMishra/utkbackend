const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/review');


router.get('/',(req ,res ,next) => {
    Review.find()
    .select('rating reason restroom_id area')
    .exec()
    .then(docs =>{
        //console.log(docs);
        const response =docs
        /*{
            count: docs.length,
            review:docs.map(doc=>{
                return{
                    rating: doc.rating,
                    reason: doc.reason,
                    restroom_id: doc.restroom_id,
                    area: doc.area
                }
            })
        };*/
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        req.status(500).json({
            error:err
        });
    });
});
router.post('/:restroom_id',(req,res,next) =>{
        const id=req.params.restroom_id;
        Review.find({restroom_id:id})
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
router.get('/:area',(req,res,next) =>{
        const area=req.params.area;
        Review.find({area:area})
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