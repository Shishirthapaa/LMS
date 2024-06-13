import React, {useEffect, useState} from "react";
import { useParams,} from "react-router-dom";
import Topbar from '../Component/Topbar';
import '../Css/Studentcourseassign.css';
import StudentCourseNavbar from "../Component/StudentCourseNavbar";
import StdAssignment from '../Component/StdAssignment';

function StudentCourseAssignment(){
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
        <div className="stdassigndashall">
            {course && (
                <div className="stdassigndashinfo">
                    <div className="stdassigntitle">
                    <h5>Course : {course.courseTitle}</h5>
                    </div>
                    <div className="stdassigncode">
                    <h5>Code: {course.courseCode}</h5>
                    </div>
                    <div className="stdassignduration">
                    <h5>Duration: {course.courseDuration} Weeks</h5>
                    </div>
                </div>
            )}
            <div className="stdassigndashcontent">
                <div className="stdassignnav">
                    <StudentCourseNavbar/>
                </div>
                <div className="stdassigncontents">
                    <div className="leftstdassignlist">
                        <StdAssignment/>
                    </div>                    
                </div>

            </div>
        </div>
        </>
    );
}

export default StudentCourseAssignment;