const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignments',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    isSubmitted: {
        type: Boolean,
        default: false
    },
    studentName: {
        type: String,
        required: true
    }
});

const SubmissionModel = mongoose.model('Submissions', SubmissionSchema);

module.exports = SubmissionModel;