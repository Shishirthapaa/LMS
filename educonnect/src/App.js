import React from 'react';
import {Route,Routes } from 'react-router-dom';
import Home from './routes/Home';
import AboutUs from './routes/AboutUs';
import Contactus from './routes/Contactus';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Studentdash from './routes/Studentdash';
import Studentcourse from './routes/Studentcourse';
import Studentlibrary from './routes/Studentlibrary';
import Studentmessage from './routes/Studentmessage';
import Studentcalendar from './routes/Studentcalendar';
import Studentevent from './routes/Studentevent';
import Admindash from './routes/Admindash';
import Admincourse from './routes/Admincourse';
import AdminCalendar from './routes/AdminCalendar';
import AdminEvent from './routes/AdminEvent';
import AdminInstructor from './routes/AdminInstructor';
import AdminStudent from './routes/AdminStudents';
import Instructordash from './routes/Instructordash';
import Instructorcourse from './routes/InstructorCourse';
import InstructorLibrary from './routes/InstructorLibrary';
import InstructorMessage from './routes/InstructorMessage';
import InstructorCalendar from './routes/InstructorCalendar';
import InstructorEvent from './routes/InstructorEvent';
import InstructorCoursedash from './routes/InstructorCoursedash';
import InstructorCourseAssignment from './routes/InstructorCourseassignment';
import InstructorCourseGrade from './routes/InstructorCourseGrade';
import StudentCoursedash from './routes/StudentCoursedash';
import StudentCourseAssignment from './routes/StudentCourseassignment';
import StudentCourseGrade from './routes/StudentCourseGrade';
import InstructorCourseStudents from './routes/InstructorCourseStudent';
import InstructorCourseNotifications from './routes/InstructorCourseNotifications';
import StudentCourseNotifications from './routes/StudentCourseNotifications';

const App=()=>{
  return(
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contactus" element={<Contactus/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/signup" element={<Signup/>}/>
        <Route path="/studentdash" element={<Studentdash/>}/>
        <Route path='/studentcourse' element={<Studentcourse/>}/>
        <Route path='/studentlibrary' element={<Studentlibrary/>}/>
        <Route path='/studentmessage' element={<Studentmessage/>}/>
        <Route path='/studentcalendar' element={<Studentcalendar/>}/>
        <Route path='/studentevent' element={<Studentevent/>}/>
        <Route path="/admindash" element={<Admindash/>}/>
        <Route path="/admincourse" element={<Admincourse/>}/>
        <Route path="/admincalendar" element={<AdminCalendar/>}/>
        <Route path='/adminevent' element={<AdminEvent/>}/>
        <Route path='/admininstructor' element={<AdminInstructor/>}/>
        <Route path='/adminstudent' element={<AdminStudent/>}/>
        <Route path="/instructordash" element={<Instructordash/>}/>
        <Route path="/instructorcourse" element={<Instructorcourse/>}/>
        <Route path="/instructorlibrary" element={<InstructorLibrary/>}/>
        <Route path="/instructormessage" element={<InstructorMessage/>}/>
        <Route path="/instructorcalendar" element={<InstructorCalendar/>}/>
        <Route path="/instructorevent" element={<InstructorEvent/>}/>
        <Route path="/instructorcoursedash/:_id/contents" element={<InstructorCoursedash/>}/>
        <Route path="/instructorcoursedash/:_id/assignments" element={<InstructorCourseAssignment/>}/>
        <Route path="/instructorcoursedash/:_id/grades" element={<InstructorCourseGrade/>}/>
        <Route path="/instructorcoursedash/:_id/students" element={<InstructorCourseStudents/>}/>
        <Route path="/instructorcoursedash/:_id/notifications" element={<InstructorCourseNotifications/>}/>
        <Route path="/studentcoursedash/:_id/contents" element={<StudentCoursedash/>}/>
        <Route path="/studentcoursedash/:_id/assignments" element={<StudentCourseAssignment/>}/>
        <Route path="/studentcoursedash/:_id/grades" element={<StudentCourseGrade/>}/>
        <Route path="/studentcoursedash/:_id/notifications" element={<StudentCourseNotifications/>}/>
      </Routes>
    </div>
  );
}
export default App;
