const express = require('express');
const router = express.Router();
const GradeModel = require('../models/Grade');

router.get("/:courseId/grades", async (req, res) => {
    try {
        const { courseId } = req.params;
        const { studentId } = req.query;

        const grades = await GradeModel.find({
            courseId,
            studentId,
            
        }).populate('assignmentId');

        if (grades.length > 0) {
            res.status(200).json(grades);
        } else {
            res.status(404).json({ message: 'Grade not found' });
        }
    } catch (error) {
        console.error('Error fetching grade:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
