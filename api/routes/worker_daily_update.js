const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const WorkerDaily = require('../models/workers_daily');
const checkAuth =require('../middleware/check-auth');


router.get('/',(req ,res ,next) => {
    WorkerDaily.find()
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

    const workerDaily = new WorkerDaily({
        _id: new mongoose.Types.ObjectId(),
        worker_id: req.body.worker_id,
        restroom_id: req.body.restroom_id,
        date: req.body.date,
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
    workerDaily
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'updated',
            workerDailyUpdate: //result
            {
                                worker_id: result.worker_id,
                                restroom_id: result.restroom_id,
                                date: result.date,
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


/*router.get('/:worker_id',(req,res,next) =>{
const worker_id = req.params.worker_id;
    WorkerDaily.findById(worker_id)
    .exec()
    .then(doc =>{
        console.log(doc);
        if(doc){
        res.status(200).json(doc);  
        }
        else{
            res.status(404).json({message:'No valid entry found'});
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    })

   
});*/

router.post('/:worker_id',(req,res,next) =>{
        const id=req.params.worker_id;
        WorkerDaily.find({worker_id:id})
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
    router.get('/:restroom_id',(req,res,next) =>{
            const id=req.params.restroom_id;
            WorkerDaily.find({restroom_id:id})
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
    router.post('/:worker_id/:date',(req,res,next) =>{
            const id=req.params.worker_id;
            const id2=req.params.date;
            WorkerDaily.find({worker_id:id,date:id2})
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
        router.get('/:restroom_id/:date',(req,res,next) =>{
                const id=req.params.restroom_id;
                const id2=req.params.date;
                WorkerDaily.find({restroom_id:id,date:id2})
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