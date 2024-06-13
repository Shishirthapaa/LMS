import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Css/Signupcss.css";
import logo from '../Images/logooz.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userNameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const isValidUserName = (studentName) => {
    if(!userNameRegex.test(studentName)){
      return "Not a valid username.";
    } else{
      return "valid username";
    }
  };
  const getUsernameColor = () => {
    if (studentName === '') {
      return 'black'; 
    } else if (userNameRegex.test(studentName)) {
      return 'green';
    } else {
      return 'red';
    }
  };

  const checkPasswordStrength = (password) => {
    if (passwordRegex.test(password)) {
      return 'Strong ';
    } else {
      return 'Weak-Password must be at least 8 characters long and include at least one letter,one special character and one number.';
    }
  };
  const getPasswordStrengthColor = () => {
    if (password === '') {
      return 'black'; 
    } else if (passwordRegex.test(password)) {
      return 'green';
    } else {
      return 'red';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    if (!passwordRegex.test(password)) {
      alert('Password does not meet the strength requirements.');
      return;
    }
    if (!userNameRegex.test(studentName)){
      alert('Not a valid username.');
      return;
    }

    axios.post('https://lms-api-cyan.vercel.app/register', { studentName, email, password })
        .then(result => {
            console.log(result);
            navigate('/login')
            alert('Registration successful.');
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status === 400 && err.response.data.message === 'User with this email already exists') {
              alert('User with this email already exists.');
          } else {
              alert('Registration failed.');
          }
        });
};
const handleTogglePassword = (field) => {
  if (field === 'password') {
    setShowPassword(!showPassword);
  } else if (field === 'confirmPassword') {
    setShowConfirmPassword(!showConfirmPassword);
  }
};

  return (
    <>
        <div className='regtop'>
          <Link to="/">
          <img src={logo} alt="logo" className="logoreg"/>
          </Link>
          </div>
        <div className="regisall">
            <div className='signhead'>
                <p id ="head_er">Sign Up</p>
            </div>
        <div className='signalltop'>
          <p id='alreadyacclog'>Already have an account ? </p>
          <Link to="/login" className='loglinks'>
            <p id="loglink_l"> Login</p>
          </Link>
        </div>
        
        <form className="signuformm" onSubmit={handleSubmit}>
          <label id='la1' htmlFor='userName'>Username</label>
          <input value={studentName} type='text' placeholder='Username' id='usernamesignbox' name='username' onChange={(e) => setStudentName(e.target.value)} required/>
          {studentName !== '' && (
          <span className=" userNamevalid" style={{ color: getUsernameColor() }}>
            {isValidUserName(studentName)}
          </span>
          )}
          <label id ="la2" htmlFor="email">Email</label>
          <input value={email} type="email" placeholder="youremail@gmail.com" id="emailsignbox" name="email" onChange={(e) => setEmail(e.target.value)} required/>
          <label id ="la3" htmlFor="password">Password</label>
          <input value={password} type={showPassword ? 'text':'password'} placeholder="Password" id="passsignbox" name="password" onChange={(e) => setPassword(e.target.value)} required/>
          <i
              className={`fa-solid fa-eye${showPassword ? '' : '-slash'}`}
              id='eye1'
              onClick={() => handleTogglePassword('password')}
            ></i>
          
          {password !== '' && (
          <span className=" passstrength" style={{ color: getPasswordStrengthColor() }}>
            Password Strength: {checkPasswordStrength(password)}
          </span>
          )}
          <label id ="la4" htmlFor="confirmPassword">Confirm Password</label>
          <input value={confirmPassword} type={showConfirmPassword ? 'text':'password'} placeholder="Confirm Password" id="conpasssignbox" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} required/>
          <i
              className={`fa-solid fa-eye${showConfirmPassword ? '' : '-slash'}`}
              id='eye2'
              onClick={() => handleTogglePassword('confirmPassword')}
            ></i>
          <button id="buttonsign" type='submit'> SIGN UP</button>
        
        </form>
        </div>
    </>
    
  )
}

export default Signup;
