const express = require('express');
const router = express.Router();
const Course = require('../models/Course');


router.delete('/deletecourses/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(deletedCourse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
