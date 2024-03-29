import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Topbar from '../Component/Topbar';
import Adminnavbar from '../Component/Adminnavbar';
import '../Css/Admindashcss.css';


function Admindash(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () =>{
        try{
            const response =await fetch('http://localhost:3001/courses/addcourses');
            if(!response.ok){
                throw new Error('failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('error fetching courses:', error);

        }

        
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
                            <h3 id='weladmdash'>Notice</h3>
                        </div>
                        <div className='admbottomrightcard'>
                            <Link to="/admincourse" className="card-link-crs">
                                <h3 id='weladmdashc'>Courses</h3>
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
                    <h3 id='weladmdash'>Upcoming Events</h3>
                </div>
                <div className='admrightbottom'>
                    <h3 id='weladmdash'>Calendar</h3>

                </div>

            </div>
        </div>
        </>
    )
}
export default Admindash;