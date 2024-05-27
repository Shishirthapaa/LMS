const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/editcourses', async (req, res)=>{
    try{
        const courses = await Course.find();
        res.json (courses);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

router.put('/editcourses/:id', async(req, res)=>{
    const courseId =req.params.id;
    const {courseTitle, courseCode, courseDescription, courseDuration } = req.body;
    try{
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
            courseTitle,
            courseCode,
            courseDescription,
            courseDuration
        }, {new: true});

        if (!updatedCourse){
            return res.status(404).json({message: "Course not found"});
        }
        res.json(updatedCourse);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});
module.exports = router;