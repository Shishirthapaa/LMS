const express = require("express");
const router = express.Router();
const InstructorModel = require('../models/Instructor');
require("dotenv").config();

router.get("/instructors/:instructorId", async (req, res) => {
    const { instructorId } = req.params;

    try {

        const instructor = await InstructorModel.findById(instructorId);

        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }

        res.json({
            instructorId: instructor.instructorId,
            instructorName: instructor.instructorName,
            email: instructor.email, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
