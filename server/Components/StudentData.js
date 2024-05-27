const express = require("express");
const router = express.Router();
const StudentModel = require('../models/Student');
require("dotenv").config();

router.get("/students/:studentId", async (req, res) => {
    const { studentId } = req.params;

    try {

        const student = await StudentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({
            studentId: student.studentId,
            studentName: student.studentName,
            email: student.email, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
