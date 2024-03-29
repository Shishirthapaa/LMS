import React from 'react';
import {Route,Routes } from 'react-router-dom';
import Home from './routes/Home';
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
import Instructordash from './routes/Instructordash';
import AdminCalendar from './routes/AdminCalendar';
import AdminEvent from './routes/AdminEvent';



const App=()=>{
  return(
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>}/>
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
        <Route path="/instructordash" element={<Instructordash/>}/>
        <Route path="/admincalendar" element={<AdminCalendar/>}/>
        <Route path='/adminevent' element={<AdminEvent/>}/>


      </Routes>
    </div>
  );
}
export default App;
