const express = require('express');
const router = express.Router();
const AssignmentModel = require('../models/Assignments');
const CourseModel = require('../models/Course'); 

router.post('/:courseId/assignments', async (req, res) => {
    const { courseId } = req.params;
    const { assignmentName, assignmentDescription, assignmentDate} = req.body;

    try {
       
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        console.log('course Id',courseId);
       
        const newAssignment = new AssignmentModel({
            name: assignmentName,
            description: assignmentDescription,
            date: assignmentDate,
            courseId: courseId, 
        });

        await newAssignment.save();

        res.status(201).json({ message: 'Assignment created successfully' });
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:courseId/assignments', async (req, res) => {
    const { courseId } = req.params;
    try {
        const assignments = await AssignmentModel.find({ courseId });
        res.json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
