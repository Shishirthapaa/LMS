import React, {useEffect, useState} from "react";
import { useParams,} from "react-router-dom";
import Topbar from '../Component/Topbar';
import '../Css/Instructorcoursedash.css';
import InstructorCourseNavbar from "../Component/InstructorCourseNavbar";
import InstCourseAccordion from "../Component/InstCourseAccordion";
import axios from 'axios';

function InstructorCoursedash(){
    const { _id } = useParams(); 
    const [course, setCourse] = useState(null);
    const [createFolderModal, setCreatefolderModal] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [folders, setFolders] = useState([]);

    const [errors, setErrors] = useState(null);

    const handleOpencreatefolderModal = () =>{
        setCreatefolderModal(true);
    }
    
    const handleClosecreatefolderModal = () =>{
        setCreatefolderModal(false);
        setErrors("");
    }
    

    useEffect(() => {
        fetchCourseDetails(_id);
        fetchFolders(_id);
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
    
    const fetchFolders = async (courseId) => {
        try{ 
            const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/${courseId}/folders`);
            if (response.status === 200) {
                setFolders(response.data);
            } else {
                console.error('Failed to fetch folders:', response.statusText);
            }
    } catch (error){
        console.error('Error fetching folders:', error);
    }

    };
    const handleCreateFolder = async () =>{
        try{
            await axios.post(`https://lms-api-cyan.vercel.app/courses/${_id}/folders`, {folderName});
            alert('Folder created Successfully!');
            handleClosecreatefolderModal()
            setErrors("");
        } catch (error){
            setErrors('Error creating folder.');
            console.error('Error creating folder:', error);
        }
    }

    return (
        <>
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className="instcrsdashall">
            {course && (
                <div className="instcrsdashinfo">
                    <div className="instcrstitle">
                    <h5>Course : {course.courseTitle}</h5>
                    </div>
                    <div className="instcrscode">
                    <h5>Code: {course.courseCode}</h5>
                    </div>
                    <div className="instcrsduration">
                    <h5>Duration: {course.courseDuration} Weeks</h5>
                    </div>
                </div>
            )}
            <div className="instcrsdashcontent">
                <div className="instcrsnav">
                    <InstructorCourseNavbar/>
                </div>
                <div className="instcrscontents">
                    <div className="leftfolderlist">
                        <InstCourseAccordion />
                    </div>
                    <div className="rightmakefolder">
                    <button id="makefolderbtn" type='button' onClick={handleOpencreatefolderModal}>Create Folder</button>
                    </div>                    
                </div>

            </div>
        </div>
        <div className={`modal fade ${createFolderModal ? 'show' : ''}`} id="createFolderModal" tabIndex="-1" aria-labelledby="createFolderModallabel" aria-hidden="true" style={{ display: createFolderModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="createFolderModallabel">Create Folder</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosecreatefolderModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="folderName" className="col-form-label">Folder Name</label>
                        <input type="text" className="form-control" id="folderName" name="folderName" value={folderName} onChange= {(e) =>setFolderName(e.target.value)} required />
                    </div>
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}              
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosecreatefolderModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleCreateFolder} style={{backgroundColor:"#7E30E1"}}>Create Folder</button>
            </div>
            
        </div>
        
    </div>
    
</div>
        </>
    );
}

export default InstructorCoursedash;