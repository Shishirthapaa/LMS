import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Toplogo from "../Images/logooz.png";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Backdrop } from "@mui/material";
import '../Css/Topbar.css';
import axios from 'axios';

const Topbar = () => {
    const [profileModal, setProfileModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [userDetails, setUserDetails] = useState({ username: '', email: '' });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [notificationModal, setNotificationModal] = useState(false);


    
    useEffect(() => {
        const userType = sessionStorage.getItem('userType');
        console.log('User Type:', userType);
        let username = '';
        let email = '';
        // let studentId = '';
        // let instructorId = '';
        // let adminId = '';

        if (userType === 'admin') {
            username = 'Admin';
            // adminId = sessionStorage.getItem('adminId');
            email = sessionStorage.getItem('adminEmail');
        } else if (userType === 'student') {
            // studentId = sessionStorage.getItem('studentId');
            username = sessionStorage.getItem('studentName');
            email = sessionStorage.getItem('studentEmail');
        } else if (userType === 'instructor') {
            // instructorId = sessionStorage.getItem('instructorId');
            username = sessionStorage.getItem('instructorName');
            email = sessionStorage.getItem('instructorEmail');
        }

        setUserDetails({ username, email });
    }, []);
    const opennotificationModal = () => {
        setNotificationModal(true);
    };

    const closenotificationModal = () => {
        setNotificationModal(false);
    };
    const openprofileModal = () => {
        setProfileModal(true);
    };

    const closeprofileModal = () => {
        setProfileModal(false);
    };
    const openChangePasswordModal = (e) => {
        e.stopPropagation();
        setChangePasswordModal(true);
    };

    const closeChangePasswordModal = () => {
        setChangePasswordModal(false);
    };
    const handleLogout = () => {
        setLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        setLogoutModal(false);
        sessionStorage.clear();
        navigate('/');
    };

    const handleCancelLogout = () => {
        setLogoutModal(false);
    };
    const handleChangePasswordConfirm = () => {
            const userType = sessionStorage.getItem('userType');
            const data = {
                currentPassword,
                newPassword,
                userType
            };

            if (userType === 'admin') {
                data.adminId = sessionStorage.getItem('adminId');
                data.adminEmail = sessionStorage.getItem('adminEmail');
            } else if (userType === 'student') {
                data.studentId = sessionStorage.getItem('studentId');
                data.studentEmail = sessionStorage.getItem('studentEmail');
            } else if (userType === 'instructor') {
                data.instructorId = sessionStorage.getItem('instructorId');
                data.instructorEmail = sessionStorage.getItem('instructorEmail');
            }
            axios.put('https://lms-api-cyan.vercel.app/changepassword', data)
            .then(response => {
                console.log('Response:', response.data);
                alert('Password updated successfully');
                setChangePasswordModal(false);
                setCurrentPassword('');
                setNewPassword('');
                setPasswordError('');

            })
            .catch(error =>  {
                if(error.response && error.response.status === 401){
                    setPasswordError("Incorrect Current Password");
                } else{
                    setPasswordError('An error occurred while changing the password');
                }
            console.error('Error:', error);
    });
};
const fetchNotice = async () =>{
    try{
        const response = await fetch(`https://lms-api-cyan.vercel.app/notices/notifications`);
        if (!response.ok){
            throw new Error('Failed to fetch Notice');
        } 
        const data = await response.json();
        setNotices(data);
    } catch(error){
        console.error('Erro fetching Notice:', error);

    }
}
useEffect(() =>{
    fetchNotice();
})
    return (
        <>
            <nav className="Topbarr">
                <div className='topleftside'>
                    <img src={Toplogo} alt="logo" className="topbarlogo"/>
                </div>
                <div className='toprightside'>
                    <NotificationsNoneIcon className='topbarnotify' fontSize="40px" onClick={opennotificationModal}/>
                    <ChatBubbleOutlineIcon className='topbarchat' fontSize="40px"/>
                    <AccountCircleIcon className='topbarprofile' fontSize="40px" onClick={openprofileModal}/>
                </div>
            </nav>
            <Backdrop className={`modal-backdrop ${profileModal || logoutModal ? 'show' : ''}`} open={profileModal || logoutModal} onClick={closeprofileModal}>
                {profileModal && (
                    <div className={`modal fade ${profileModal ? 'show' : ''}`} id="openprofileModal" tabIndex="-1" aria-labelledby="openprofileModalLabel" aria-hidden="true" style={{ display: profileModal ? 'block' : 'none', position: 'fixed', top: '0', width: '100%', height: '100%', zIndex: '1040' }}>
                        <div className="modal-dialog" style={{ position: 'relative', width: 'auto' }}>
                            <div className="modal-content" style={{ backgroundColor: '#fff', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '6px', outline: '0' }}>
                                <div className="modal-header">
                                    <button type="button" className="btn-close" aria-label="Close" onClick={closeprofileModal}></button>
                                </div>
                                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h4>Profile</h4>
                                    <p>Username: {userDetails.username}</p>
                                    <p>Email: {userDetails.email}</p>
                                    <button className="changepasswordbtn" onClick={(e) => openChangePasswordModal(e)}>Change Password</button>
                                    <button className="logoutbtn" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {logoutModal && (
                    <div className={`modal fade ${logoutModal ? 'show' : ''}`} id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true" style={{ display: logoutModal ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1040' }}>
                        <div className="modal-dialog" style={{ position: 'relative', width: 'auto' }}>
                            <div className="modal-content" style={{ backgroundColor: '#fff', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '6px', outline: '0' }}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="logoutModalLabel">Logout Confirmation</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCancelLogout}></button>
                                </div>
                                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <p>Are you sure you want to logout?</p>
                                    <div style={{ width:'60%', display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                                    <button className="btn btn-primary" onClick={handleCancelLogout}>No</button>
                                    <button className="btn btn-danger" onClick={handleLogoutConfirm}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {changePasswordModal && (
                    <div className={`modal fade ${changePasswordModal ? 'show' : ''}`} id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true" style={{ display: changePasswordModal ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1040' }}>
                        <div className="modal-dialog" style={{ position: 'relative', width: 'auto' }}>
                            <div className="modal-content" style={{ backgroundColor: '#fff', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '6px', outline: '0' }} onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="changePasswordModalLabel">Change Password</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={closeChangePasswordModal}></button>
                                </div>
                                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <div className="form-group">
                                        <label htmlFor="currentPassword" style={{marginRight:'30%'}}>Current Password</label>
                                        <input type="password" className="form-control" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group" style={{marginTop:'4%'}}>
                                        <label htmlFor="newPassword" style={{marginRight:'40%'}}>New Password</label>
                                        <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                    {passwordError && <p style={{ color: 'red', marginTop: '5px' }}>{passwordError}</p>}
                                    <div style={{ width:'60%', display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop: '20px'}}>
                                        <button className="btn btn-secondary" onClick={closeChangePasswordModal}>Close</button>
                                        <button className="btn btn-primary" onClick={handleChangePasswordConfirm}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Backdrop>
            {notificationModal && (
                    <div className={`modal fade ${notificationModal ? 'show' : ''}`} id="opennotificationModal" tabIndex="-1" aria-labelledby="notificationModalLabel" aria-hidden="true" style={{ display: notificationModal ? 'block' : 'none', position: 'fixed', top: '0', width: '100%', height: '100%', zIndex: '1040' }}>
                        <div className="modal-dialog" style={{ position: 'relative', width: 'auto' }}>
                            <div className="modal-content" style={{ backgroundColor: '#fff', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '6px', outline: '0' }}>
                                <div className="modal-header">
                                    <button type="button" className="btn-close" aria-label="Close" onClick={closenotificationModal}></button>
                                </div>
                                {notices.map((notice, index)=>( 
                            <div className='noticeicondetails' key={index}>
                                <div className="noticeiconinfo">
                                    <p className='noticeiconteacher'>{notice.teacher} added a notice in {notice.courseId.courseTitle}</p>

                                    
                                </div>
                                {index < notices.length - 1 && <hr className='noticeiconseparator' />}
                            </div>
                            ))}
                            </div>
                        </div>
                    </div>
            )}
        </>
    );
}

export default Topbar;
