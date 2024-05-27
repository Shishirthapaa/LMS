import { Link } from 'react-router-dom';
import Topbar from '../Component/Topbar';
import Instructornavbar from '../Component/Instructornavbar';
import "../Css/Instructorcourse.css";
import crsimg1 from '../Images/crs1.png';
import crsimg2 from '../Images/crs2.png';
import crsimg3 from '../Images/crs3.png';
import crsimg4 from '../Images/crs4.png';
import crsimg5 from '../Images/crs5.png';
import crsimg6 from '../Images/crs6.png';
import { useEffect, useState} from 'react';

function Instructorcourse(){
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
    const getRandomImage = () =>{
        const imageSrc = [crsimg1, crsimg2, crsimg3, crsimg4, crsimg5, crsimg6];
        const randomIndex = Math.floor(Math.random() * imageSrc.length);
        return imageSrc[randomIndex];
    }
    return(
        <>
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className='instsiderrr'>
        <Instructornavbar/>
        </div>
        
        <div className='instcrsall'>
            {courses.map((course, index) => (
            <Link to={`/instructorcoursedash/${course._id}/contents`} key={course._id} className='instcourse-link'>
            <div className='instcrscard' key={course._id}>
                <div className='instimgspace'>
                <img src={Image[index]} className='instcrsimg' alt=""/>
                </div>
                <div className='instcrsnamespace'>
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
export default  Instructorcourse;