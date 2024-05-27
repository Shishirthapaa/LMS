const express = require('express');
const router = express.Router();
const NotificationModel = require('../models/Notification');


router.put('/notifications/:notificationId', async (req, res) => {
  const { notificationId } = req.params;
  const { notificationTeacher, notificationDescription, notificationDate } = req.body;

  try {
    const updatedNotification = await NotificationModel.findByIdAndUpdate(
      notificationId,
      { teacher: notificationTeacher ,
       description: notificationDescription ,
       date: notificationDate
      },
    {new: true }
    );
    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error('Error updating Notification:', error);
    res.status(500).json({ error: 'Error updating Notification' });
  }
});

router.delete('/notifications/:notificationId', async (req, res) => {
  const { notificationId } = req.params;

  try {
    await NotificationModel.findByIdAndDelete(notificationId);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting Notification:', error);
    res.status(500).json({ error: 'Error deleting Notification' });
  }
});

module.exports = router;
