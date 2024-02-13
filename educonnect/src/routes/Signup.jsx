import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Css/Signupcss.css";
import logo from '../Images/logooz.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    axios.post('http://localhost:3001/register', { userName, email, password })
        .then(result => {
            console.log(result);
            navigate('/login')
            alert('Registration successful.');
        })
        .catch(err => {
            console.log(err);
            alert('Registration failed.');
        });
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
                <a id ="head_er">Sign Up</a>
            </div>
        <div className='signalltop'>
          <a id='alreadyacclog'>Already have an account? </a>
          <Link to="/login" className='loglinks'>
            <a id="loglink_l">Login</a>
          </Link>
        </div>
        
        <form className="signuformm" onSubmit={handleSubmit}>
          <label id='la1' htmlFor='userName'>Username</label>
          <input value={userName} type='text' placeholder=' Username' id='usernamesignbox' name='username' onChange={(e) => setUserName(e.target.value)}/>
          <label id ="la2" htmlFor="email">Email</label>
          <input value={email} type="email" placeholder=" youremail@gmail.com" id="emailsignbox" name="email" onChange={(e) => setEmail(e.target.value)} />
          <label id ="la3" htmlFor="password">Password</label>
          <input value={password} type="password" placeholder=" **********" id="passsignbox" name="password" onChange={(e) => setPassword(e.target.value)} />
          <label id ="la4" htmlFor="confirmPassword">Confirm Password</label>
          <input value={confirmPassword} type="password" placeholder=" **********" id="conpasssignbox" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
          <button id="buttonsign" type='submit'> SIGN UP</button>
        
        </form>
        </div>
    </>
    
  )
}

export default Signup;
