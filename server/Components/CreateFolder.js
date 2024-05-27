const express = require('express');
const router = express.Router();
const FolderModel = require('../models/Folders');
const CourseModel = require('../models/Course'); 

router.post('/:courseId/folders', async (req, res) => {
    const { courseId } = req.params;
    const { folderName } = req.body;

    try {
        
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        console.log('course Id',courseId);
        const newFolder = new FolderModel({
            name: folderName,
            courseId: courseId, 
        });

        
        await newFolder.save();

        res.status(201).json({ message: 'Folder created successfully' });
    } catch (error) {
        console.error('Error creating folder:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:courseId/folders', async (req, res) => {
    const { courseId } = req.params;
    try {
        const folders = await FolderModel.find({ courseId });
        res.json(folders);
    } catch (error) {
        console.error('Error fetching folders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
