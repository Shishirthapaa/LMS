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

    const handleSubmit =(e)=>{
        e.preventDefault();
        //console.log(email, pass, userType);
        //console.log('Selected UserType:',userType);
        axios.post('http://localhost:3001/login',{email, password, userType})
        .then(result =>{
            console.log(result);
            if (result.data === "Success") {
              if (userType === "student") {
                navigate('/studentdash');
              } else if (userType === "instructor") {
                navigate('/instructordash');
              } else if (userType === "admin") {
                navigate('/admindash');
              }
            }
        
    }).catch(err => {
        console.log(err);
        alert('Login failed.');
    });
    }
    
    const selectUserType = (role)=>{
        setUserType(role);
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
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder=" youremail@gmail.com" id="emailbox" name="email"/> 
                    <label id="password" htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder=" **********" id="passwordbox" name="password"/>
                    <button id="button2log" type='submit'>LOGIN</button> 
                </form>
                <div className='forpw'>
                <a>Forgot Password? </a>
                    <Link to="/forgotpw" id="forgotlink">
                        <a id="resetlog" >Reset</a>   {/* When buuton clicked it moves to Forgot Password page */}
                    </Link>
                </div>
                
    </div>
    </div>
    
        
    
    </>
)
}
export default Login;