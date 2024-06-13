import { Link } from 'react-router-dom';
import Topbar from '../Component/Topbar';
import Studnavbar from '../Component/Studnavbar';
import "../Css/Studentcoursecss.css";
import crsimg1 from '../Images/crs1.png';
import crsimg2 from '../Images/crs2.png';
import crsimg3 from '../Images/crs3.png';
import crsimg4 from '../Images/crs4.png';
import crsimg5 from '../Images/crs5.png';
import crsimg6 from '../Images/crs6.png';
import { useEffect, useState} from 'react';

function Studentcourse(){
    const [courses, setCourses] = useState([]);
    const [Image, setImage] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (courses.length > 0) {
            const images = courses.map(() => getRandomImage());
            setImage(images);
        }
    }, [courses]);

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
    const getRandomImage = () =>{
        const imageSrc = [crsimg1, crsimg2, crsimg3, crsimg4, crsimg5, crsimg6];
        const randomIndex = Math.floor(Math.random() * imageSrc.length);
        return imageSrc[randomIndex];
    }
    return(
        <>
        <div className='headerrtop'>
        <Topbar/>
        </div>
        <div className='siderrr'>
        <Studnavbar/>
        </div>
        <div className='stdcrsall'>
            {courses.map((course, index) =>(
            <Link to={`/studentcoursedash/${course._id}/contents`} key={course._id} className='stdcourse-link'>
            <div className='stdcrscard' key={course._id}>
                <div className='imgspace'>
                <img src={Image[index]} className='crsimg' alt=""/>
                </div>
                <div className='crsnamespace'>
                <h4>{course.courseTitle}</h4>
                <h6>({course.courseCode})</h6>
                <h6>{course.courseDuration} Weeks</h6>
                </div>
            </div>
            </Link>
            ))}

        </div>
        </>
    )
}
export default Studentcourse;