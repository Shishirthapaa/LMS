const express = require('express');
const router = express.Router();
const Course = require('../models/Course');



router.get('/addcourses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/addcourses', async (req, res) => {
    const {courseId} =req.body;
    try{
        const existingCourse = await Course.findOne({courseId});
        if (existingCourse){
            return res.status(400).json({message: 'Course with the same Id already exists'});
        }
    const course = new Course({
        courseId,
        courseTitle: req.body.courseTitle,
        courseDescription: req.body.courseDescription,
        courseDuration: req.body.courseDuration
    });
    
    const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;