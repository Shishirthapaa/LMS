import React, {useEffect, useState} from "react";
import { useParams,} from "react-router-dom";
import Topbar from '../Component/Topbar';
import '../Css/Instructorcoursestudent.css';
import InstructorCourseNavbar from "../Component/InstructorCourseNavbar";
import axios from "axios";
import InstStudent from "../Component/InstStudent";


function InstructorCourseStudents(){
    const { _id } = useParams(); 
    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        fetchCourseDetails(_id);
    }, [_id]);

    const fetchCourseDetails = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:3001/courses/addcourses/${courseId}`);
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
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className="inststudentdashall">
            {course && (
                <div className="inststudentdashinfo">
                    <div className="inststudenttitle">
                    <h5>Course : {course.courseTitle}</h5>
                    </div>
                    <div className="inststudentcode">
                    <h5>Code: {course.courseCode}</h5>
                    </div>
                    <div className="inststudentduration">
                    <h5>Duration: {course.courseDuration} Weeks</h5>
                    </div>
                </div>
            )}
            <div className="inststudentdashcontent">
                <div className="inststudentnav">
                    <InstructorCourseNavbar/>
                </div>
                <div className="inststudentcontents">
                    <div className="leftstudentlist">
                        <InstStudent/>
                    </div>                   
                </div>

            </div>
        </div>
        </>
    );
}

export default InstructorCourseStudents;