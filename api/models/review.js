const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rating: { type: Number, required: true},
    reason: { type: String, required: true},
    restroom_id: { type: String, required: true},
    area: { type: String, required: true}
    
    
});

module.exports = mongoose.model('Review',reviewSchema);