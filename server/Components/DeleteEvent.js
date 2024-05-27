const express = require('express');
const router = express.Router();
const Event = require('../models/Event');


router.delete('/deleteevents/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(deletedEvent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
