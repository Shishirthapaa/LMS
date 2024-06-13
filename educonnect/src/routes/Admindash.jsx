import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Topbar from '../Component/Topbar';
import Adminnavbar from '../Component/Adminnavbar';
import '../Css/Admindashcss.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Admindash(){
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        fetchCourses();
        fetchEvents();
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
        <div className='admintopp'>
        <Topbar/>
        </div>
        <div className='adminsidee'>
        <Adminnavbar/>
        </div>
        <div className='alladmcard'>
            <div className='admleftcard'>
                    <div className='admlefttopcard'>
                        <h3 id='weladmdash'> Welcome to Admin Dashboard</h3>
                    </div>
                    <div className='admleftbottomcard'>
                        <div className='admbottomleftcard'>
                            <h4 id='weladmdashn'>Notice</h4>
                            {notices.map((notice, index)=>( 
                            <div className='admnoticedetails' key={index}>
                                <h5 className='admnoticecoursename'>{notice.courseId.courseTitle}</h5>
                                <p className='admnoticedesc'> {notice.description}</p>
                                <div className="admnoticeinfo">
                                    <p className='admnoticeteacher'>{notice.teacher}</p>
                                    <p className='admnoticedate'>{formatDate(notice.date)}</p>
                                </div>
                                {index < notices.length - 1 && <hr className='admnoticeseparator' />}
                            </div>
                            ))}
                        </div>
                        <div className='admbottomrightcard'>
                            <Link to="/admincourse" className="card-link-crs">
                                <h4 id='weladmdashc'>Courses</h4>
                            </Link>

                            <ul className='crslistul'>
                                {courses.map(course =>(
                                    <li className='crslistli' key={course._id}>{course.courseTitle}</li>
                                ))}
                            </ul>
                            
                        </div>
                    </div>

            </div>
            <div className='admrightcard'>
                <div className='admrighttop'>
                    <Link to="/adminevent" className='card-link-events'>
                    <h4 id='weladmdashe'>Upcoming Events</h4>
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
                <div className='admrightbottom'>
                    
                        <Calendar />

                </div>

            </div>
        </div>
        </>
    )
}
export default Admindash;