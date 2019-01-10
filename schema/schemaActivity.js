const mongoose = require('mongoose');
const config = require('../config/config');



var activitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    step: {
        type: Number,
        required: false
    },
    moods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mood' }]

},{ timestamps: { createdAt: 'created_at' }})

activitySchema.methods = {

}

module.exports = mongoose.model('Activity', activitySchema);