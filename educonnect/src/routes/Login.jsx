import React,{useState} from "react";
import {Link} from 'react-router-dom';
import"../Css/Logincss.css";
import logos from '../Images/logooz.png';
import studentimg from '../Images/studentimg.png';
import instructorimg from '../Images/instructorimg.png';
import adminimg from '../Images/administrator.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login=()=>{
    const [email, setEmail]=useState('');
    const [password,setPass] = useState('');
    const [userType, setUserType]=useState('');
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    axios.defaults.withCredentials = true;

    const handleSubmit =(e)=>{
        e.preventDefault();
          if (!userType) {
            alert('Please select a User type.');
            return;
          }
        //console.log(email, pass, userType);
        //console.log('Selected UserType:',userType);
        axios.post('https://lms-api-cyan.vercel.app/login', {email, password, userType})
        .then(result => {
            console.log('Login result:',result);

            const { accessToken, userType, studentName, instructorName, studentId, instructorId, adminId, studentEmail, instructorEmail, adminEmail } = result.data;
                    if (accessToken && userType) {
                    sessionStorage.setItem('token', accessToken);
                    sessionStorage.setItem('userType', userType);
                    sessionStorage.setItem('studentName', studentName);
                    sessionStorage.setItem('instructorName', instructorName);
                    sessionStorage.setItem('adminId', adminId);
                    sessionStorage.setItem('studentEmail', studentEmail);
                    sessionStorage.setItem('instructorEmail', instructorEmail);
                    sessionStorage.setItem('adminEmail', adminEmail);
                    if (userType === 'student') {
                        sessionStorage.setItem('studentId', studentId);
                    } else if (userType === 'instructor') {
                        sessionStorage.setItem('instructorId', instructorId);
                    }

                    switch (userType) {
                        case 'student':
                        navigate('/studentdash');
                        break;
                        case 'instructor':
                        navigate('/instructordash');
                        break;
                        case 'admin':
                        navigate('/admindash');
                        break;
                        default:
                        alert('Invalid user type');
                    }
            } else{
                alert('Incorrect email and password.');
            }
        
    }).catch((err) => {
        if (err.response) {
            if (err.response.status === 401 && err.response.data === "Incorrect password") {
              alert('Incorrect password.');
            } else if (err.response.status === 404 && err.response.data === "Invalid user") {
              alert('Invalid user.');
            } else {
              alert('Login failed.');
            }
          } else {
            alert('Login failed.');
          }
    });
    };
    
    const selectUserType = (role)=>{
        setUserType(role);
    };
    const handleTogglePassword = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
          }));
        };

return(
    <> 
    <div className='haddlog'>
    <Link to="/">
    <img src={logos} alt="logo" className="loglogo"/>
    </Link>
    </div>           
    <div className="loginpage">
    <div className="logcard">
        <div className='wellog'>
        <a id='welloge'>Login</a>
        </div>
        <div className='toplog'>
            <a id='noacc'>Don't have an account ? </a>
            <Link id='signlink'to="/signup">
                <a id='sg'> Sign Up</a> {/* When buuton clicked it moves to signup page */}
            </Link>
            <h1 className="chooseacc">Choose Account Type</h1>
        </div>
        <div className="usercard">
                        <div className={`stud ${userType === 'student' ? 'selected' : ''}`} onClick={() => selectUserType('student')}>
                            <img src={studentimg} alt="" className="studimg"></img>
                            <h2 className="student">Student</h2>
                        </div>
                        <div className={`teach ${userType === 'instructor' ? 'selected' : ''}`} onClick={() => selectUserType('instructor')}>
                            <img src={instructorimg} alt="" className="instimg"></img>
                            <h2 className="instruct">Instructor</h2>
                        </div>
                        <div className={`adm ${userType === 'admin' ? 'selected' : ''}`} onClick={() => selectUserType('admin')}>
                            <img src={adminimg} alt="" className="admiimg"></img>
                            <h2 className="adminn">Admin</h2>
                        </div>
        </div>


    <form id="logeslog"onSubmit={handleSubmit}> {/* a form is created where email and password is entered by user and stored */}
                    <label id="email" htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="emailbox" name="email" required/> 
                    <label id="password" htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPass(e.target.value)} type={showPassword.password ? 'text':'password'} placeholder="Password" id="passwordbox" name="password" required/>
                    <i
                    className={`fa-solid fa-eye${showPassword.password ? '' : '-slash'}`}
                    id='eye3'
                    onClick={() => handleTogglePassword('password')}
                    ></i>
                    <button id="button2log" type='submit'>LOGIN</button> 
                </form>
                {/* <div className='forpw'>
                <a>Forgot Password? </a>
                    <Link to="/forgotpw" id="forgotlink">
                        <a id="resetlog" >Reset</a>
                    </Link>
                </div> */}
                
    </div>
    </div>
    
    </>
)
}
export default Login;