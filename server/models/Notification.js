const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    },
    
}, { timestamps: true }); 

const NotificationModel = mongoose.model('Notifications', NotificationSchema);

module.exports = NotificationModel;
