const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  instructorId: { type: String, required: true},
  instructorName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  pic: {
    type: String,
    default: "https://icon-library.com/images/anonymous-avatar-icon-anonymous-avatar-icon-25.jpg",
},
},
{timestamps: true}
);

const InstructorModel = mongoose.model('Instructor', InstructorSchema);

module.exports = InstructorModel;