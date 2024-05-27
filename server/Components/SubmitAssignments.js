const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const SubmissionModel = require('../models/Submission')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../submissions'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  router.post("/submission", upload.single('file'), async (req, res) => {
    const { assignmentId, studentId, studentName, courseId } = req.body;

    try {
        let submission = await SubmissionModel.findOne({ assignmentId, studentId, studentName, courseId});
        if (submission){
            submission.isSubmitted = true;
        } else{
           submission = new SubmissionModel({
            assignmentId,
            studentId,
            courseId,
            fileName: req.file.originalname, 
            filePath: req.file.path, 
            isSubmitted: true,
            studentName
        });
        }

        await submission.save();

        res.status(200).json({ message: "Assignment submitted successfully", filePath: submission.filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
