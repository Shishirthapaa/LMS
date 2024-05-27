const mongoose = require('mongoose');

const SubmissionStatusSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignments',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    isSubmitted: {
        type: Boolean,
        default: false
    }
});

const SubmissionStatusModel = mongoose.model('SubmissionStatus', SubmissionStatusSchema, 'submissionstatus');

module.exports = SubmissionStatusModel;
