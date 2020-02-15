const mongoose = require('mongoose');

const workerDailySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    worker_id: { type: String, required: true},
    restroom_id: { type: String, required: true},
    date: { type: Date, required: true},
    q1:{type: Boolean,require:true},
    q2:{type: Boolean,require:true},
    q3:{type: Boolean,require:true},
    q4:{type: Boolean,require:true},
    q5:{type: Boolean,require:true},
    q6:{type: Boolean,require:true},
    q7:{type: Boolean,require:true},
    q8:{type: Boolean,require:true},
    q9:{type: Boolean,require:true},
    q10:{type: Boolean,require:true}  
});

module.exports = mongoose.model('WorkerDaily',workerDailySchema);