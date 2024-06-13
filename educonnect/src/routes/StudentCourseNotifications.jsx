import React, {useEffect, useState} from "react";
import { useParams,} from "react-router-dom";
import Topbar from '../Component/Topbar';
import '../Css/Studentcoursenotify.css';
import StudentCourseNavbar from "../Component/StudentCourseNavbar";
import StdNotification from "../Component/StdNotification";



function StudentCourseNotifications(){
    const { _id } = useParams(); 
    const [course, setCourse] = useState(null);



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

    return (
        <>
        <div className='stdheaderrtop'>
        <Topbar/>
        </div>
        <div className="stdnotifydashall">
            {course && (
                <div className="stdnotifydashinfo">
                    <div className="stdnotifytitle">
                    <h5>Course : {course.courseTitle}</h5>
                    </div>
                    <div className="stdnotifycode">
                    <h5>Code: {course.courseCode}</h5>
                    </div>
                    <div className="stdnotifyduration">
                    <h5>Duration: {course.courseDuration} Weeks</h5>
                    </div>
                </div>
            )}
            <div className="stdnotifydashcontent">
                <div className="stdnotifynav">
                    <StudentCourseNavbar/>
                </div>
                <div className="stdnotifycontents">
                    <div className="stdleftnotifylist">
                        <StdNotification/>
                    </div>                  
                </div>

            </div>
        </div>
        </>


    );
}

export default StudentCourseNotifications;