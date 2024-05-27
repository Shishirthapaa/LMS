const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


router.delete('/deletestudents/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(deletedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
