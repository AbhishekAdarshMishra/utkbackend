const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Admin= require("../models/admin");
const bcryptjs= require('bcryptjs');



router.post('/',(req,res,next) => {
    Admin.find({admin_id: req.body.admin_id})
    .exec()
    .then(admin =>{
        if(admin.length >= 1){
            return res.status(200).json({
                code:409,
                message: 'admin Id already exist'
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
                    const admin =new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        admin_id: req.body.admin_id,
                        password:hash,
                        superauth:req.body.superauth,
                        
                    });
                    admin
                        .save()
                        .then(result =>{
                            res.status(200).json({
                                code:200,
                                message: 'admin created'
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
router.get('/:admin_id',(req,res,next) =>{
        const id=req.params.admin_id;
        Admin.find({admin_id:id})
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