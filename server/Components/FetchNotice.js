const express = require('express');
const router = express.Router();
const CourseModel = require('../models/Course')
const NotificationModel = require('../models/Notification');



router.get('/notifications', async (req, res) => {
    try {
        const notices = await NotificationModel.find({}).populate({ model: CourseModel, path: 'courseId'})
        res.json(notices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;