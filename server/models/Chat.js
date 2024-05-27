const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        chatName: {
            type: String, trim: true
        },
        isGroupChat: {type: Boolean, default: false

        },
        users: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Student'
                },
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Instructor'
                }
            ],
        latestMessage:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instructor',
        }
    },
    {
        timestamps: true
    }
);

const ChatModel = mongoose.model('Chat', ChatSchema);

module.exports = ChatModel;
