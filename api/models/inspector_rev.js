const mongoose = require('mongoose');

const inspectorRevSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    inspector_id: { type: String, required: true},
    restroom_id: { type: String, required: true},
    area: { type: String, required: true},
    q1:{type: Number,require:true},
    q2:{type: Number,require:true},
    q3:{type: Number,require:true},
    q4:{type: Number,require:true},
    q5:{type: Number,require:true},
    q6:{type: Number,require:true},
    q7:{type: Number,require:true},
    q8:{type: Number,require:true},
    q9:{type: Number,require:true},
    q10:{type: Number,require:true}  
});

module.exports = mongoose.model('InspectorRev',inspectorRevSchema);