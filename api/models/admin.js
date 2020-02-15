const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    admin_id: { type: String, required: true},
    password: { type: String, required: true},
    superauth: { type: Boolean, required: true},
    
});

module.exports = mongoose.model('Admin',adminSchema);