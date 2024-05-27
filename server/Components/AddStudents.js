const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/addstudents', async(req, res)=>{
    try{
        const students = await  Student.find();
        res.json(students);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

router.post('/addstudents', async (req, res) =>{
    const {studentId} = req.body;
    try{
        const existingStudent = await Student.findOne({studentId});
        if (existingStudent){
            return res.status(400).json({message: 'Student with same id already exists'});
        }

        const student = new Student({
            studentId,
            studentName: req.body.studentName,
            email: req.body.email,
            password: req.body.password
        });
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;