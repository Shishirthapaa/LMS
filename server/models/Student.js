const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    studentId:{type: String, required: true},
    studentName: {type: String, required: true},
    email: {type: String, unique:true, required: true},
    password: {type: String, required: true},
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon-anonymous-avatar-icon-25.jpg",
    },
},
{timestamps: true}
);

const StudentModel = mongoose.model("Student", StudentSchema)
module.exports = StudentModel