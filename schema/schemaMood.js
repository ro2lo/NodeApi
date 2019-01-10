const mongoose = require('mongoose');
const config = require('../config/config');

var moodSchema = mongoose.Schema({
    value: {
    type: Number,
    required: true
    },
    label: {
    type: Date,
    default: Date.now,
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

moodSchema.methods = {

}

module.exports = mongoose.model('Mood', moodSchema);