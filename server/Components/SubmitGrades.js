const express = require('express')
const router = express.Router();
const GradeModel = require('../models/Grade')

router.post("/:courseId/gradedsubmissions", async (req, res) => {

    try{
        const {courseId} = req.params;
        const {assignmentId, studentId, submissionId, studentName, fullMarks, achievedMarks} = req.body;
        
        if (!assignmentId || !studentId || !submissionId || !studentName || !fullMarks || !achievedMarks){
            return res.status(400).json({ message: 'Missing required fields'});
        }

        const grade = new GradeModel ({
            courseId,
            submissionId,
            assignmentId,
            studentId,
            studentName,
            fullMarks,
            achievedMarks,
            isGraded: true
        });
        await grade.save();
        res.status(200).json({ message: 'Submission graded successfully', grade});
    } catch (error) {
        console.error('Error grading submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/checkSubmissionGradingStatus', async (req, res) => {
    try {
        const { submissionId } = req.query;

        const existingGrade = await GradeModel.findOne({
            submissionId
        });

        res.json({ isGraded: !!existingGrade });
    } catch (error) {
        console.error('Error checking submission grading status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;