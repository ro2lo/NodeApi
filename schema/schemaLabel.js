const mongoose = require('mongoose');
const config = require('../config/config');

var labelSchema = mongoose.Schema({
    value: {
    type: Number,
    required: true
    },
    label: {
    type: String,
    required: true
    },
    note: {
        type: String,
        required: false
    },
    activity_id: {
        type:  [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
        required: true
    },
},{ timestamps: { createdAt: 'created_at' }})

labelSchema.methods = {

}

module.exports = mongoose.model('Label', labelSchema);