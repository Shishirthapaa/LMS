const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const InstructorModel = mongoose.model('Instructor', InstructorSchema);

// Created few instructors
InstructorModel.create([
    {
    email: 'instructor1@gmail.com',
    password: 'instructorPassword1',
    },
    {
    email: 'instructor2@gmail.com',
    password: 'instructorPassword2',
    },
    ])
  .then(instructors => {
    console.log('Default instructor user created:', instructors);
    })
  .catch(error => console.error('Error creating default instructor user:', error));

module.exports = InstructorModel;