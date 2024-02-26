const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const StudentModel = require('./models/Student');
const AdminModel = require('./models/Admin');
const InstructorModel = require('./models/Instructor');
require("dotenv").config();


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/lms");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

app.post("/login", async (req, res) => {
    const { email, password, userType } = req.body;
  
    try {
      let user;
      switch (userType) {
        case "student":
          user = await StudentModel.findOne({ email });
          console.log('Found user:', user);
          if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', passwordMatch);

          if (passwordMatch) {
            const accessToken = generateAccessToken({email: user.email, userType: 'student'});
            return res.json({ accessToken, userType: 'student' });
          } else {
              return res.status(401).json("Incorrect password");
          }
          } else {
              return res.status(404).json("User not found");
          }
        break;
        case "instructor":
          user = await InstructorModel.findOne({ email });
          console.log('Found user:', user);
          if (user) {
            if (user.password === password) {
              const accessToken = generateAccessToken({ email: user.email, userType: 'instructor' });
              return res.json({ accessToken, userType: 'instructor' });
            } else {
              return res.status(401).json("Incorrect password");
            }
          }else{
            return res.status(404).json("User not found");
          }
          break;
        case "admin":
          user = await AdminModel.findOne({ email });
          console.log('Found user:', user);
          if (user) {
            if (user.password === password) {
              const accessToken = generateAccessToken({ email: user.email, userType: 'admin' });
              return res.json({ accessToken, userType: 'admin' });
            } else {
              return res.status(401).json("Incorrect password");
            }
          } else{
            return res.status(404).json("User not found");
          }
          break;
         default:
          return res.status(400).json("Invalid user type");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  });

app.post('/register', async (req, res) => {
  try{
    const {userName, email, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    await StudentModel.create({userName, email, password: hash});
    res.json({success: true, message: 'Registration successful'});
  }catch(error) {
    console.error(error);
    res.status(500).json({success: false, message:'Registration failed'});
  }
});

app.listen(3001, () =>{
    console.log("server is running")
});