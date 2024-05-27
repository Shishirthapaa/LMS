const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

router.get('/editinstructors', async (req, res)=>{
    try{
        const instructors = await Instructor.find();
        res.json (instructors);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

router.put('/editinstructors/:id', async(req, res)=>{
    const instructorId =req.params.id;
    const {instructorName, email } = req.body;
    try{
        const updatedInstructor = await Instructor.findByIdAndUpdate(instructorId,{
            instructorName,
            email
        }, {new: true});

        if (!updatedInstructor){
            return res.status(404).json({message: "Instructor not found"});
        }
        res.json(updatedInstructor);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});
module.exports = router;