const express = require('express');
const router = express.Router();
const GradeModel = require('../models/Grade')


router.get('/:courseId/progress', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const studentId = req.query.studentId; 

        const grades = await GradeModel.find({
             courseId, 
             studentId }).populate('assignmentId');
        res.status(200).json(grades);
    } catch (error) {
        console.error('Error fetching grades:', error);
        res.status(500).json({ error: 'Failed to fetch grades' });
    }
});

module.exports = router;
