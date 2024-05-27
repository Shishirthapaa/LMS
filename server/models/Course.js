const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    courseId: Number,
    courseTitle: String,
    courseCode: String,
    courseDescription: String,
    courseDuration: Number
})

const CourseModel = mongoose.model("Courses", CourseSchema)
module.exports = CourseModel;