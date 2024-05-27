const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

router.get('/addinstructors', async(req, res) =>{
    try{
        const instructors = await Instructor.find();
        res.json(instructors);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

router.post('/addinstructors', async (req, res) =>{
    const {instructorId} = req.body;
    try{
        const existingInstructor = await Instructor.findOne({instructorId});
        if (existingInstructor){
            return res.status(400).json({message: 'Instructor with same id already exists '});
        }
    
        const instructor = new Instructor({
            instructorId,
            instructorName: req.body.instructorName,
            email: req.body.instructorEmail,
            password: req.body.instructorPassword
        });
        const newInstructor = await instructor.save();
            res.status(201).json(newInstructor);
         } catch (err){
            res.status(400).json({ message: err.message});
        }
});

module.exports = router;

