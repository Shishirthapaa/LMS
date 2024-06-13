import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Topbar from '../Component/Topbar';
import Instructornavbar from '../Component/Instructornavbar';
import '../Css/Instructordash.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Instructordash(){
    const [instructorName, setInstructorName] = useState('');
    const [events, setEvents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [notices, setNotices] = useState([]);

    const instructorId = sessionStorage.getItem('instructorId');


    useEffect(() => {
        fetchInstructorData();
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
                throw new Error('failed to fetch events');
            }
            const data = await response.json();
            setEvents(data);
        } catch (error){
            console.error('error fetching events:', error);
        }
    }


    const fetchInstructorData = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`https://lms-api-cyan.vercel.app/details/instructors/${instructorId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok){
                throw new Error('Failed to fetch instructor data');
            }
            const data = await response.json();
            setInstructorName(data.instructorName);
        } catch (error) {
            console.error('Error fetching instructor name:', error);
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
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className='instsiderrr'>
        <Instructornavbar/>
        </div>
        <div className='allinstcard'>
            <div className='instrleftcard'>
                    <div className='instlefttopcard'>
                        <h3 id='welinstdash'> Welcome back,</h3>
                        <h3 id='instname'>{instructorName}</h3>
                    </div>
                    <div className='instleftbottomcard'>
                        <div className='instbottomleftcard'>
                            <h4 id='welinstdash'>Notice</h4>
                            {notices.map((notice, index)=>( 
                            <div className='instnoticedetails' key={index}>
                                <h5 className='instnoticecoursename'>{notice.courseId.courseTitle}</h5>
                                <p className='instnoticedesc'> {notice.description}</p>
                                <div className="instnoticeinfo">
                                    <p className='instnoticeteacher'>{notice.teacher}</p>
                                    <p className='instnoticedate'>{formatDate(notice.date)}</p>
                                </div>
                                {index < notices.length - 1 && <hr className='instnoticeseparator' />}
                            </div>
                            ))}
                        </div>
                        <div className='instbottomrightcard'>
                            <Link to="/instructorcourse" className="card-link-crs">
                                <h4 id='welinstdashc'>Courses</h4>
                            </Link>

                            <ul className='crslistul'>
                                {courses.map(course =>(
                                    <li className='crslistli' key={course._id}>{course.courseTitle}</li>
                                ))}
                            </ul>                            
                        </div>
                    </div>

            </div>
            <div className='instrrightcard'>
                <div className='righttop'>
                    <Link to="/instructorevent" className='card-link-instevents'>
                    <h4 id='welinstdashe'>Upcoming Events</h4>
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
                <div className='rightbottom'>
                <Calendar />

                </div>

            </div>
        </div>
        </>
    )
}
export default Instructordash;