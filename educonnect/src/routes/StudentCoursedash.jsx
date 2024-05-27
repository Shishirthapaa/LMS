import React, {useEffect, useState} from "react";
import { useParams,} from "react-router-dom";
import Topbar from '../Component/Topbar';
import '../Css/Studentcoursedash.css';
import StudentCourseNavbar from "../Component/StudentCourseNavbar";
import StdCourseAccordion from "../Component/StdCourseAccordion";
import axios from 'axios';

function StudentCoursedash(){
    const { _id } = useParams(); 
    const [course, setCourse] = useState(null);
    const [folders, setFolders] = useState([]);
    

    useEffect(() => {
        fetchCourseDetails(_id);
        fetchFolders(_id);
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
    
    const fetchFolders = async (courseId) => {
        try{ 
            const response = await axios.get(`http://localhost:3001/courses/${courseId}/folders`);
            if (response.status === 200) {
                setFolders(response.data);
            } else {
                console.error('Failed to fetch folders:', response.statusText);
            }
    } catch (error){
        console.error('Error fetching folders:', error);
    }

    };

    return (
        <>
        <div className='stdheaderrtop'>
        <Topbar/>
        </div>
        <div className="stdcrsdashall">
            {course && (
                <div className="stdcrsdashinfo">
                    <div className="stdcrstitle">
                    <h5>Course : {course.courseTitle}</h5>
                    </div>
                    <div className="stdcrscode">
                    <h5>Code: {course.courseCode}</h5>
                    </div>
                    <div className="stdcrsduration">
                    <h5>Duration: {course.courseDuration} Weeks</h5>
                    </div>
                </div>
            )}
            <div className="stdcrsdashcontent">
                <div className="stdcrsnav">
                    <StudentCourseNavbar/>
                </div>
                <div className="stdcrscontents">
                    <div className="leftfolderlist">
                        <StdCourseAccordion />
                    </div>                   
                </div>

            </div>
        </div>
        </>
    );
}

export default StudentCoursedash;