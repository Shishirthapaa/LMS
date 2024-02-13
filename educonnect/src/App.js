import React from 'react';
import {Route,Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Studentdash from './routes/Studentdash';
import Instructordash from './routes/Instructordash';
import Admindash from './routes/Admindash';

const App=()=>{
  return(
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/signup" element={<Signup/>}/>
        <Route path="/studentdash" element={<Studentdash/>}/>
        <Route path="/instructordash" element={<Instructordash/>}/>
        <Route path="/admindash" element={<Admindash/>}/>

      </Routes>
    </div>
  );
}
export default App;
