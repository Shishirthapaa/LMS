const express = require("express");
const router = express.Router();
const SubmissionModel = require('../models/Submission')

router.get("/:courseId/submittedassignments", async (req, res) => {
    try {
        const {courseId} = req.params;
        const submissions = await SubmissionModel.find({ courseId }).populate({
            path: 'assignmentId',
            select: 'name' 
        }).populate('studentId', 'studentName');
        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  module.exports = router;