const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
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
    studentName: {
        type: String,
        required: true
    },
    fullMarks:{
        type: Number,
        required: true
    },
    achievedMarks: {
        type: Number,
        required: true
    },
    isGraded: {
        type: Boolean,
        default: false
    }
});

const GradeModel = mongoose.model('Grades', GradeSchema);

module.exports = GradeModel;