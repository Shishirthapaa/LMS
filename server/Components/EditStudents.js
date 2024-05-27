const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/editstudents', async (req, res)=>{
    try{
        const students = await Student.find();
        res.json (students);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

router.put('/editstudents/:id', async(req, res)=>{
    const studentId =req.params.id;
    const {studentName, email } = req.body;
    try{
        const updatedStudent = await Student.findByIdAndUpdate(studentId,{
            studentName,
            email
        }, {new: true});

        if (!updatedStudent){
            return res.status(404).json({message: "Student not found"});
        }
        res.json(updatedStudent);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});
module.exports = router;