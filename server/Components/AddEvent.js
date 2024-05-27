const express = require('express');
const router = express.Router();
const Event = require('../models/Event');



router.get('/addevents', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/addevents', async (req, res) => {
    const {eventId} =req.body;
    try{
        const existingEvent = await Event.findOne({eventId});
        if (existingEvent){
            return res.status(400).json({message: 'Event with the same Id already exists'});
        }
    const event = new Event({
        eventId,
        eventTitle: req.body.eventTitle,
        eventDescription: req.body.eventDescription,
        eventDate: req.body.eventDate
    });
    
    const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;