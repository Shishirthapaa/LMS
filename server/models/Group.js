const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    }],
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, { timestamps: true });

const GroupModel = mongoose.model('Group', GroupSchema);

module.exports = GroupModel;
