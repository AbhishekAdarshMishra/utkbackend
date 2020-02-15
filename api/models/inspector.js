const mongoose = require('mongoose');

const inspectorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    inspector_id: { type: String, required: true},
    password: { type: String, required: true},
    area: { type: String, required: true}
});

module.exports = mongoose.model('Inspector',inspectorSchema);