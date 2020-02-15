const mongoose = require('mongoose');

const workerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    worker_id: { type: String, required: true},
    password: { type: String, required: true},
    area: { type: String, required: true}
});
module.exports = mongoose.model('Worker',workerSchema);