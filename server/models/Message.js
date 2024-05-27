const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        senderType: {
            type: String,
            enum: ['Student', 'Instructor'],
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'senderType'
        },
        content: {
            type: String,
            trim: true,
            required: true
        },
        groupId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
