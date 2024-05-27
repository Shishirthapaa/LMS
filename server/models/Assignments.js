const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', 
        required: true
    },
    
}, { timestamps: true }); 

const AssignmentModel = mongoose.model('Assignments', AssignmentSchema);


module.exports = AssignmentModel;
