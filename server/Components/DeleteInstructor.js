const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');


router.delete('/deleteinstructors/:id', async (req, res) => {
    const instructorId = req.params.id;
    try {
        const deletedInstructor = await Instructor.findByIdAndDelete(instructorId);
        if (!deletedInstructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        res.json(deletedInstructor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
