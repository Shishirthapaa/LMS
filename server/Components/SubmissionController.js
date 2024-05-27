const express = require('express');
const router = express.Router();
const SubmissionModel = require('../models/Submission');

router.get('/submissionstatus/:assignmentId/:studentId', async (req, res) => {
    const { assignmentId, studentId } = req.params;
    try {
        const submissionStatus = await SubmissionModel.findOne({ assignmentId, studentId });
        if (!submissionStatus) {
            return res.status(404).json({ message: "Submission status not found" });
        }
        res.json({isSubmitted: submissionStatus.isSubmitted});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
