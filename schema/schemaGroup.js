const mongoose = require('mongoose');
const config = require('../config/config');



var groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    user_id: {
        type:  [{ type:  mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: true
    },
    activity: {
        type:  [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
        required: true
    }
},{ timestamps: { createdAt: 'created_at' }})

groupSchema.methods = {

}

module.exports = mongoose.model('Group', groupSchema);