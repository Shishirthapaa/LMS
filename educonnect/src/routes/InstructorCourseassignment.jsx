import React, {useEffect, useState} from "react";
import { useParams,} from "react-router-dom";
import Topbar from '../Component/Topbar';
import '../Css/Instructorcourseassign.css';
import InstructorCourseNavbar from "../Component/InstructorCourseNavbar";
import axios from "axios";
import InstAssignment from "../Component/InstAssignment";


function InstructorCourseAssignment(){
    const { _id } = useParams(); 
    const [course, setCourse] = useState(null);
    const [createAssignmentModal, setCreateAssignmentModal] = useState(false);
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentDate, setAssignmentDate] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');

    const [errors, setErrors] = useState(null);

    const handleOpencreateAssignmentModal = () =>{
        setCreateAssignmentModal(true);
    }
    
    const handleClosecreateAssignmentModal = () =>{
        setCreateAssignmentModal(false);
        setErrors("");
    }

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
    const handleCreateAssignment = async () =>{
        try{
            console.log('Assignment Name:', assignmentName);
            console.log('Assignment Date:', assignmentDate);

            await axios.post(`https://lms-api-cyan.vercel.app/courses/${_id}/assignments`, {assignmentName, assignmentDescription, assignmentDate});
            alert('Assignment created Successfully!');
            handleClosecreateAssignmentModal()
            setErrors("");
        } catch (error){
            setErrors('Error creating Assignment.');
            console.error('Error creating Assignment:', error);
        }
    }

    return (
        <>
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className="instassigndashall">
            {course && (
                <div className="instassigndashinfo">
                    <div className="instassigntitle">
                    <h5>Course : {course.courseTitle}</h5>
                    </div>
                    <div className="instassigncode">
                    <h5>Code: {course.courseCode}</h5>
                    </div>
                    <div className="instassignduration">
                    <h5>Duration: {course.courseDuration} Weeks</h5>
                    </div>
                </div>
            )}
            <div className="instassigndashcontent">
                <div className="instassignnav">
                    <InstructorCourseNavbar/>
                </div>
                <div className="instassigncontents">
                    <div className="leftassignlist">
                        <InstAssignment/>
                    </div>
                    <div className="rightmakeassign">
                    <button id="makeassignbtn" type='button' onClick={handleOpencreateAssignmentModal}>Create Assignment</button>
                    </div>                    
                </div>

            </div>
        </div>
        <div className={`modal fade ${createAssignmentModal ? 'show' : ''}`} id="createAssignmentModal" tabIndex="-1" aria-labelledby="createAssignmentModallabel" aria-hidden="true" style={{ display: createAssignmentModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="createAssignmentModallabel">Create Assignment</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosecreateAssignmentModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="assignmentName" className="col-form-label">Assignment Title:</label>
                        <input type="text" className="form-control" id="assignmentName" name="assignmentName" value={assignmentName} onChange= {(e) =>setAssignmentName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="assignmentDescription" className="col-form-label">Assignment Description:</label>
                        <textarea className="form-control" id="assignmentDescription" name="assignmentDescription" value={assignmentDescription} onChange={(e) =>setAssignmentDescription(e.target.value)} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="assignmentDate" className="col-form-label">Submission Date:</label>
                        <input type="date" className="form-control" id="assignmentDate" name="assignmentDate" value={assignmentDate} onChange={(e) =>setAssignmentDate(e.target.value)} required  />
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}   
                    </div>           
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosecreateAssignmentModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleCreateAssignment} style={{backgroundColor:"#7E30E1"}}>Create Assignment</button>
            </div>
            
        </div>
        
    </div>
    
</div>
        </>
    );
}

export default InstructorCourseAssignment;