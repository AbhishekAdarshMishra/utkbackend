const mongoose = require('mongoose');

const restroomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    restroom_id: { type: String, required: true},
    password: { type: String, required: true},
    area: { type: String, required: true},
    rating: { type: Number, required: true},
    count: { type: Number, required: true},
    mailsuper:{ type: String, required: true}
});

module.exports = mongoose.model('Restroom',restroomSchema);