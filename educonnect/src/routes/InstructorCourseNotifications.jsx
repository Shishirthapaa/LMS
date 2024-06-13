import React, {useEffect, useState} from "react";
import { useParams,} from "react-router-dom";
import Topbar from '../Component/Topbar';
import '../Css/Instructorcoursenotify.css';
import InstructorCourseNavbar from "../Component/InstructorCourseNavbar";
import InstNotifications from "../Component/InstNotifications";
import axios from "axios";


function InstructorCourseNotifications(){
    const { _id } = useParams(); 
    const [course, setCourse] = useState(null);
    const [createNotificationModal, setCreateNotificationModal] = useState(false);
    const [notificationDescription, setNotificationDescription] = useState('');
    const [notificationDate, setNotificationDate] = useState('');
    const [notificationTeacher, setNotificationTeacher] = useState('');
    const [errors, setErrors] = useState(null);
    const teacherName = sessionStorage.getItem('instructorName');



    useEffect(() => {
        fetchCourseDetails(_id);
    }, [_id]);

    const fetchCourseDetails = async (courseId) => {
        try {
            const response = await fetch(`https://lms-api-cyan.vercel.app/courses/addcourses/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch course details');
            }
            const data = await response.json();
            setCourse(data);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const handleOpencreateNotificationModal = () =>{
        setCreateNotificationModal(true);
        setNotificationDate(getCurrentDate());
        setNotificationTeacher(teacherName);
    }
    
    const handleClosecreateNotificationModal = () =>{
        setCreateNotificationModal(false);
        setErrors("");
    }

    const getCurrentDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        return formattedDate;
    }


    const handleCreateNotification = async () =>{
        try{
            console.log('Notification Description:', notificationDescription);
            console.log('Notification Date:', notificationDate);

            await axios.post(`https://lms-api-cyan.vercel.app/courses/${_id}/notifications`, {notificationDescription, notificationDate, notificationTeacher});
            alert('Notification created Successfully!');
            handleClosecreateNotificationModal()
            setErrors("");
        } catch (error){
            setErrors('Error creating Notification.');
            console.error('Error creating Notification:', error);
        }
    }

    return (
        <>
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className="instnotifydashall">
            {course && (
                <div className="instnotifydashinfo">
                    <div className="instnotifytitle">
                    <h5>Course : {course.courseTitle}</h5>
                    </div>
                    <div className="instnotifycode">
                    <h5>Code: {course.courseCode}</h5>
                    </div>
                    <div className="instnotifyduration">
                    <h5>Duration: {course.courseDuration} Weeks</h5>
                    </div>
                </div>
            )}
            <div className="instnotifydashcontent">
                <div className="instnotifynav">
                    <InstructorCourseNavbar/>
                </div>
                <div className="instnotifycontents">
                    <div className="instleftnotifylist">
                        <InstNotifications/>
                    </div>
                    <div className="instrightmakenotify">
                    <button id="makenotifybtn" type='button' onClick={handleOpencreateNotificationModal}>Create Notifications</button>
                    </div>                    
                </div>

            </div>
        </div>


        <div className={`modal fade ${createNotificationModal ? 'show' : ''}`} id="createNotificationModal" tabIndex="-1" aria-labelledby="createNotificationModallabel" aria-hidden="true" style={{ display: createNotificationModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="createNotificationModallabel">Create Notification</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosecreateNotificationModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="notificationDescription" className="col-form-label">Notification Description:</label>
                        <textarea className="form-control" id="notificationDescription" name="notificationDescription" value={notificationDescription} onChange={(e) =>setNotificationDescription(e.target.value)} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="notificationDate" className="col-form-label">Notification Date:</label>
                        <input type="date" className="form-control" id="notificationDate" name="notificationDate" value={notificationDate} disabled />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="notificationTeacher" className="col-form-label">Notified By:</label>
                        <input type="text" className="form-control" id="notificationTeacher" name="notificationTeacher" value={notificationTeacher} disabled/>
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}   
                    </div>           
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosecreateNotificationModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleCreateNotification} style={{backgroundColor:"#7E30E1"}}>Create Notification</button>
            </div>
            
        </div>
        
        </div>
    
        </div>

        </>


    );
}

export default InstructorCourseNotifications;