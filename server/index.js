const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const StudentModel = require('./models/Student')
const bcrypt = require('bcrypt')


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/students");

app.post("/login", (req, res) =>{
    const {email, password} = req.body;
    StudentModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) =>{
                if(response) {
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")
               }
            })
    
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    const {userName, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash =>{
        StudentModel.create({userName, email, password: hash})
        .then(students => res.json(students))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))

})

app.listen(3001, () =>{
    console.log("server is running")
})