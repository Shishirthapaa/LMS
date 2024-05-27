const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/editevents', async (req, res)=>{
    try{
        const events = await Event.find();
        res.json (events);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

router.put('/editevents/:id', async(req, res)=>{
    const eventId =req.params.id;
    const {eventTitle, eventDescription, eventDate } = req.body;
    try{
        const updatedEvent = await Event.findByIdAndUpdate(eventId,{
            eventTitle,
            eventDescription,
            eventDate
        }, {new: true});

        if (!updatedEvent){
            return res.status(404).json({message: "Event not found"});
        }
        res.json(updatedEvent);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});
module.exports = router;