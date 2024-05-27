const express = require('express');
const router = express.Router();
const NotificationModel = require('../models/Notification');
const CourseModel = require('../models/Course'); 

router.post('/:courseId/notifications', async (req, res) => {
    const { courseId } = req.params;
    const { notificationDescription, notificationDate, notificationTeacher} = req.body;
    
    if (!notificationDescription || !notificationDate || !notificationTeacher) {
        return res.status(400).json({ message: 'Notification description, date, and teacher are required' });
    }
    try {
       
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        console.log('course Id',courseId);
       
        const newNotification = new NotificationModel({
            description: notificationDescription,
            date: notificationDate,
            teacher: notificationTeacher,
            courseId: courseId, 
        });

        await newNotification.save();

        res.status(201).json({ message: 'Notification created successfully' });
    } catch (error) {
        console.error('Error creating Notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:courseId/notifications', async (req, res) => {
    const { courseId } = req.params;
    try {
        const notifications = await NotificationModel.find({ courseId });
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
