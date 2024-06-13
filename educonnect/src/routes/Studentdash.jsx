import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Topbar from '../Component/Topbar';
import Studnavbar from '../Component/Studnavbar';
import "../Css/Studdashcss.css"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Studentdash(){
    const [studentName, setStudentName] = useState('');
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const [notices, setNotices] = useState([]);
    
    const studentId = sessionStorage.getItem('studentId');

    useEffect(() => {
        fetchStudentData();
        fetchEvents();
        fetchCourses();
        fetchNotice();
    }, []);


    const fetchCourses = async () =>{
        try{
            const response =await fetch('https://lms-api-cyan.vercel.app/courses/addcourses');
            if(!response.ok){
                throw new Error('failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('error fetching courses:', error);

        }

        
    }

    const fetchEvents = async ()=>{
        try{
            const response = await fetch('https://lms-api-cyan.vercel.app/events/addevents');
            if(!response.ok){
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setEvents(data);
        } catch (error){
            console.error('error fetching events:', error);
        }
    }
    const fetchStudentData = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`https://lms-api-cyan.vercel.app/details/students/${studentId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok){
                throw new Error('Failed to fetch student data');
            }
            const data = await response.json();
            setStudentName(data.studentName);
        } catch (error) {
            console.error('Error fetching student name:', error);
        }
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
    const formatDate = (dateString) =>{
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    return(
        <>
        <div className='headerrtop'>
        <Topbar/>
        </div>
        <div className='siderrr'>
        <Studnavbar/>
        </div>
        <div className='allstdcard'>
            <div className='studleftcard'>
                    <div className='stdlefttopcard'>
                        <h3 id='welstddash'> Welcome back,</h3>
                        <h3 id='stdname'> {studentName}</h3>
                    </div>
                    <div className='stdleftbottomcard'>
                        <div className='stdbottomleftcard'>
                            <h4 id='welstddashn'>Notice</h4>
                            {notices.map((notice, index)=>( 
                            <div className='stdnoticedetails' key={index}>
                                <h5 className='stdnoticecoursename'>{notice.courseId.courseTitle}</h5>
                                <p className='stdnoticedesc'> {notice.description}</p>
                                <div className="stdnoticeinfo">
                                    <p className='stdnoticeteacher'>{notice.teacher}</p>
                                    <p className='stdnoticedate'>{formatDate(notice.date)}</p>
                                </div>
                                {index < notices.length - 1 && <hr className='stdnoticeseparator' />}
                            </div>
                            ))}
                        </div>
                        <div className='stdbottomrightcard'>
                        <Link to="/studentcourse" className="card-link-crs">
                                <h4 id='welstddashc'>Courses</h4>
                            </Link>

                            <ul className='crslistul'>
                                {courses.map(course =>(
                                    <li className='crslistli' key={course._id}>{course.courseTitle}</li>
                                ))}
                            </ul>
                            
                        </div>
                    </div>

            </div>
            <div className='studrightcard'>
                <div className='stdrighttop'>
                    <Link to="/studentevent" className='card-link-stdevents'>
                    <h4 id='welstddashe'>Upcoming Events</h4>
                    </Link>
                    <ul className='eventlistul'>
                                {events.map(event =>(
                                    <li className='eventlistli' key={event._id}>
                                        <span className='eventtitle'>{event.eventTitle}</span>
                                        <span className='eventdate'>{event.eventDate}</span>
                                        </li>
                                ))}
                            </ul>
                </div>
                <div className='stdrightbottom'>
                <Calendar />

                </div>

            </div>
        </div>
        </>
    )
}
export default Studentdash;