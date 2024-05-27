const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    eventId: Number,
    eventTitle: String,
    eventDescription: String,
    eventDate: Date
})

EventSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.eventDate = ret.eventDate.toISOString().split('T')[0];
        return ret;
    }
});

const EventModel = mongoose.model("Events", EventSchema)
module.exports = EventModel