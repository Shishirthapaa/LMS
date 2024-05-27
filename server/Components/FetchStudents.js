const express = require("express");
const router = express.Router();
const StudentModel = require('../models/Student')

router.get('/students', async (req, res) => {
    try {
        const students = await StudentModel.find();
        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
