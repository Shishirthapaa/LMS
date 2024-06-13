const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const StudentModel = require('./models/Student');
const AdminModel = require('./models/Admin');
const InstructorModel = require('./models/Instructor');
require("dotenv").config();
const axios = require('axios');
const addcourseRouter = require('./Components/AddCourse');
const editcourseRouter = require('./Components/EditCourse');
const deletecourseRouter = require('./Components/DeleteCourse');
const addeventRouter = require('./Components/AddEvent');
const editeventRouter = require('./Components/EditEvent');
const deleteeventRouter = require('./Components/DeleteEvent');
const addinstructorRouter = require('./Components/AddInstructor');
const editinstructorRouter = require('./Components/EditInstructor');
const deleteinstructorRouter = require('./Components/DeleteInstructor');
const addstudentRouter = require('./Components/AddStudents');
const editstudentRouter = require('./Components/EditStudents');
const deletestudentRouter = require('./Components/DeleteStudent');
const createFolder = require('./Components/CreateFolder');
const SaveFiles = require('./Components/SaveFiles');
const EditandDeleteFolder = require('./Components/EditandDeleteFolder');
const EditandDeleteFiles = require('./Components/EditandDeleteFiles');
const createAssignment = require('./Components/CreateAssignment');
const EditandDeleteAssignment = require('./Components/EditandDeleteAssignment');
const StudentData = require('./Components/StudentData');
const InstructorData = require('./Components/InstructorData');
const SubmitAssignments = require('./Components/SubmitAssignments');
const SubmissionController = require('./Components/SubmissionController');
const FetchSubmission = require('./Components/FetchSubmission');
const SubmitGrades = require('./Components/SubmitGrades');
const GradeData = require('./Components/GradeData');
const FetchStudents = require('./Components/FetchStudents');
const ViewProgress = require('./Components/ViewProgress');
const CreateNotifications = require('./Components/CreateNotifications');
const EditandDeleteNotification = require('./Components/EditandDeleteNotification');
const FetchNotice = require('./Components/FetchNotice');
const FetchMessage = require('./Components/FetchMessage');



const app = express();

app.use(cors({
  origin: ["https://educonnect-by-shishir.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());


app.options('*', cors());

app.use('/courses', addcourseRouter);
app.use('/courses', editcourseRouter);
app.use('/courses', deletecourseRouter);
app.use('/courses', createFolder);
app.use('/courses', EditandDeleteFolder );
app.use('/courses', SaveFiles);
app.use('/courses', EditandDeleteFiles);
app.use('/courses', createAssignment);
app.use('/courses', EditandDeleteAssignment);
app.use('/events', addeventRouter);
app.use('/events', editeventRouter);
app.use('/events', deleteeventRouter);
app.use('/instructors', addinstructorRouter);
app.use('/instructors', editinstructorRouter);
app.use('/instructors', deleteinstructorRouter);
app.use('/students', addstudentRouter);
app.use('/students', editstudentRouter);
app.use('/students', deletestudentRouter);
app.use('/uploads', express.static('./uploads'));
app.use('/details', StudentData);
app.use('/details', InstructorData);
app.use('/assignment', SubmitAssignments);
app.use('/assignment', SubmissionController);
app.use('/courses', FetchSubmission);
app.use('/courses', SubmitGrades)
app.use('/submissions', express.static('./submissions'))
app.use('/courses', GradeData);
app.use('/courses', FetchStudents);
app.use('/courses', ViewProgress);
app.use('/courses', CreateNotifications);
app.use('/courses', EditandDeleteNotification);
app.use('/notices', FetchNotice);
app.use('/lms', FetchMessage);



const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

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
            const accessToken = generateAccessToken({email: user.email, userType: 'student', studentId: user._id});
            return res.json({ accessToken, userType: 'student', studentName: user.studentName, studentId: user._id, studentEmail:user.email });
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
              const accessToken = generateAccessToken({ email: user.email, userType: 'instructor', instructorId: user._id});
              return res.json({ accessToken, userType: 'instructor', instructorName: user.instructorName, instructorId: user._id, instructorEmail:user.email  });
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
              const accessToken = generateAccessToken({ email: user.email, userType: 'admin', adminId: user._id});
              return res.json({ accessToken, userType: 'admin', adminId: user._id, adminEmail:user.email });
            } else {
              return res.status(401).json("Incorrect password");
            }
          } else{
            return res.status(404).json("Invalid user");
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

app.put("/changepassword", async (req, res) => {
    const { currentPassword, newPassword, userType, studentId, studentEmail, instructorId, instructorEmail, adminId, adminEmail } = req.body;

    try {
        let user;
        switch (userType) {
            case "student":
              if (!mongoose.Types.ObjectId.isValid(studentId)) {
                return res.status(400).json("Invalid student ID");
              }
              user = await StudentModel.findOne({ _id: studentId, email: studentEmail});
                if (user) {
                  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
                  if (passwordMatch){
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    user.password = hashedPassword;
                    await user.save();
                    return res.json("Password updated successfully");
                  }else {
                      return res.status(401).json("Incorrect password");
                  }
                }else {
                    return res.status(404).json("Student not found");
                }
                break;
            case "instructor":
              if (!mongoose.Types.ObjectId.isValid(instructorId)) {
                return res.status(400).json("Invalid instructor ID");
            }                
            user = await InstructorModel.findOne({ _id: instructorId, email: instructorEmail });
                if (user) {
                  if(user.password === currentPassword){
                    user.password = newPassword;
                    await user.save();
                    return res.json("Password updated successfully");
                  } else{
                    return res.status(401).json("Incorrect password");
                  }
                    
                } else{
                  return res.status(404).json("Instructor not found");
                }
                break;
            case "admin":
              if (!mongoose.Types.ObjectId.isValid(adminId)) {
                return res.status(400).json("Invalid admin ID");
            }                
            user = await AdminModel.findOne({ _id: adminId, email: adminEmail });
                if (user) {
                  if(user.password === currentPassword){
                    user.password = newPassword;
                    await user.save();
                    return res.json("Password updated successfully");
                  } else{
                    return res.status(401).json("Incorrect password");
                  }
                    
                } else{
                  return res.status(404).json("Admin not found");
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
    const {studentName, email, password} = req.body;
    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const studentId = await generateUniqueStudenId();

    const hash = await bcrypt.hash(password, 10);
    await StudentModel.create({ studentId, studentName, email, password: hash});
    res.json({success: true, message: 'Registration successful', studentId});
  }catch(error) {
    console.error(error);
    res.status(500).json({success: false, message:'Registration failed'});
  }
});

 async function generateUniqueStudenId(){
  let studentId; 
  let isUnique = false;

  while (!isUnique) {
    studentId = Math.floor(Math.random() * 10001) + 10000; 

    const existingStudent = await StudentModel.findOne({ studentId });

    if (!existingStudent) {
      isUnique = true;
    }
  }

  return studentId;
}
const GBOOKS_API_KEY = process.env.GBOOKS_API_KEY;

app.get('/searchbooks', async (req, res) => {
  const{ query } = req.query;
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12&key=${GBOOKS_API_KEY}`);
    const books = response.data.items.map(item => ({

      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
      coverUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
      description: item.volumeInfo.description || 'No description available.',
    }))
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/staticbooks', async (req, res) => {
  try {
    const programmingResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=6&key=${GBOOKS_API_KEY}`);
    const educationResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=education&maxResults=6&key=${GBOOKS_API_KEY}`);
    
    const books = [
      ...programmingResponse.data.items,
      ...educationResponse.data.items
    ].map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
      coverUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
      description: item.volumeInfo.description || 'No description available.',

    }));
    
    res.json(books);
  } catch (error) {
    console.error('Error fetching static books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log('Request from origin:', req.headers.origin);
  next();
});