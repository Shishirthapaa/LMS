import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Topbar from '../Component/Topbar';
import Adminnavbar from '../Component/Adminnavbar';
import "../Css/Admincoursecss.css";
import 'bootstrap/dist/css/bootstrap.min.css';



function Admincourse(){
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [crsEditModal, setcrsEditModal] = useState(false);
    const [crsDeleteModal, setcrsDeleteModal] = useState(false);

    const [newCourse, setNewCourse] = useState({
        courseId: "",
        courseTitle: "",
        courseCode:"",
        courseDescription: "",
        courseDuration: ""
    });
    const [errors, setError] = useState("");

    useEffect(() =>{
    fetchCourses();
},[]);

const fetchCourses = async () => {
    try {
        const response = await fetch('http://localhost:3001/courses/addcourses');
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
    } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses. Please try again.');
    }
};

    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleOpencrsEditModal = (course) =>{
        setcrsEditModal(true);
        setSelectedCourse(course);
        setNewCourse({
            courseId: course.courseId,
            courseTitle: course.courseTitle,
            courseCode: course.courseCode,
            courseDescription: course.courseDescription,
            courseDuration: course.courseDuration
        });
    }
    const handleClosecrsEditModal = () =>{
        setcrsEditModal(false);
        setSelectedCourse(null);
    }
    const handleOpencrsDeleteModal = (course) =>{
        setcrsDeleteModal(true);
        setSelectedCourse(course);
    }
    const handleClosecrsDeleteModal = () =>{
        setcrsDeleteModal(false);
        setSelectedCourse(null);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleAddCourse = async () => {
        if (!newCourse.courseId || !newCourse.courseTitle || !newCourse.courseCode || !newCourse.courseDescription || !newCourse.courseDuration){
            setError("Please fill in all fields.");
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/courses/addcourses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });
            if (!response.ok) {
                throw new Error('Failed to add course');
            }
                const data = await response.json();
                setCourses([...courses, data]);
                setNewCourse({
                    courseId: "",
                    courseTitle: "",
                    courseCode:"",
                    courseDescription: "",
                    courseDuration: ""
                });
                setError("");
                handleCloseModal();
            
        } catch (error) {
            setError('Failed to add Course! Course already exists.');
            console.error('Error adding course:', error);
        }
    }
    const handleEditCourse = async () => {
        try {console.log('Selected Course:', selectedCourse);

            if (!selectedCourse || !selectedCourse._id) {
                setError('No course selected for editing');
                return;
            }
          const { courseId, courseTitle, courseCode, courseDescription, courseDuration } = newCourse;
          const courseData = { courseId, courseTitle, courseCode, courseDescription, courseDuration };
          if (!selectedCourse._id) {
            setError('Selected course does not have a valid ID');
            return;
        } 
          const response = await fetch(`http://localhost:3001/courses/editcourses/${selectedCourse._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
          });
          if (!response.ok) {
            throw new Error('Failed to edit course');
          }
          const updatedCourse = await response.json();
          const updatedCourses = courses.map(course => course._id === updatedCourse._id ? updatedCourse : course);
          setCourses(updatedCourses);
          setSelectedCourse(null);
          setNewCourse({
            courseId: "",
            courseTitle: "",
            courseCode:"",
            courseDescription: "",
            courseDuration: ""
          });
          setcrsEditModal(false);
          setError("");
        } catch (error) {
          setError('Failed to edit course. Please try again.');
          console.error('Error editing course:', error);
        }
      };
    
      const handleDeleteCourse = async () => {
        try {
          const response = await fetch(`http://localhost:3001/courses/deletecourses/${selectedCourse._id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete course');
          }
          const deletedCourseId = selectedCourse._id;
          const updatedCourses = courses.filter(course => course._id !== deletedCourseId);
          setCourses(updatedCourses);
          setSelectedCourse(null);
          setcrsDeleteModal(false);
        } catch (error) {
          console.error('Error deleting course:', error);
        }
      };
    
    
    return(
        <>
        <div className='admintopp'>
        <Topbar/>
        </div>
        <div className='adminsidee'>
        <Adminnavbar/>
        </div>
        <div className='adminall'>
            <div className='admcourseinfo'>
                <h3 className='courseinfoo'>Course-Info</h3> 
            </div>
            <button id="addcrsbtn" type='button' onClick={handleOpenModal}>Add Course</button> 

            <div className="container" style={{ width: '81.6%', margin:'1.5%' }}>
                <div className="row">
                    <div className="col-md-12 offset-custom mb-3 ">
                    <div className="card" style={{boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.10)'}}>
                        <div className="card-body">
                        <div className="row font-weight-bold" style={{ backgroundColor: '#383A3F', color: 'white', padding: '10px 0' }}>
                            <div className="col">Course ID</div>
                            <div className="col">Course Title</div>
                            <div className="col">Course Code</div>
                            <div className="col">Course Duration(in weeks)</div>
                            <div className="col">Actions</div>
                        </div>
                        {courses.map(course => (
                        <div className="row" key={course._id}>
                            <div className="col">{course.courseId}</div>
                            <div className="col">{course.courseTitle}</div>
                            <div className="col">{course.courseCode}</div>
                            <div className="col">{course.courseDuration}</div>
                            <div className="col">
                            <button className="btn btn-edit mr-2" onClick={() => handleOpencrsEditModal(course)}>
                            <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn btn-delete" onClick={() => handleOpencrsDeleteModal(course)}>
                            <i className="fa-solid fa-trash"></i>
                            </button>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            
                           

        </div>
        <div className={`modal fade ${showModal ? 'show' : ''}`} id="addCourseModal" tabIndex="-1" aria-labelledby="addCourseModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none',marginTop: '1.2%' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ fontSize: '1rem', padding:'0rem', overflowY: 'auto' }}>
            <div className="modal-header" style={{ padding: '0.5rem'}}>
                <h2 className="modal-title fs-5" id="addCourseModalLabel">Add New Course</h2>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-2">
                        <label htmlFor="courseId" className="col-form-label">Course ID:</label>
                        <input type="text" className="form-control" id="courseId" name="courseId" value={newCourse.courseId} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="courseTitle" className="col-form-label">Course Title:</label>
                        <input type="text" className="form-control" id="courseTitle" name="courseTitle" value={newCourse.courseTitle} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="courseCode" className="col-form-label">Course Code:</label>
                        <input type="text" className="form-control" id="courseCode" name="courseCode" value={newCourse.courseCode} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="courseDescription" className="col-form-label">Course Description:</label>
                        <textarea className="form-control" id="courseDescription" name="courseDescription" value={newCourse.courseDescription} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="courseDuration" className="col-form-label">Course Duration:</label>
                        <input type="text" className="form-control" id="courseDuration" name="courseDuration" value={newCourse.courseDuration} onChange={handleInputChange} required />
                        {errors && (<div className="alert alert-danger mt-1" style={{ padding: '0.3rem', fontSize: '1rem' }}>{errors}</div>)}                 </div>
                </form>
            </div>
            
            <div className="modal-footer" style={{ padding: '0.4rem'}}>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleAddCourse} style={{backgroundColor:"#7E30E1"}}>Add Course</button>
            </div>
            
        </div>
        
    </div>
    
</div>

<div className={`modal fade ${crsEditModal ? 'show' : ''}`} id="editCourseModal" tabIndex="-1" aria-labelledby="editCourseModalLabel" aria-hidden="true" style={{ display: crsEditModal ? 'block' : 'none', marginTop: '1.2%' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ fontSize: '1rem', padding:'0rem', overflowY: 'auto' }}>
            <div className="modal-header" style={{ padding: '0.5rem'}}>
                <h1 className="modal-title fs-5" id="editCourseModalLabel">Edit Course</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosecrsEditModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-2">
                        <label htmlFor="courseId" className="col-form-label">Course ID:</label>
                        <input type="text" className="form-control" id="courseId" name="courseId" value={newCourse.courseId} onChange={handleInputChange} required disabled/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="courseTitle" className="col-form-label">Course Title:</label>
                        <input type="text" className="form-control" id="courseTitle" name="courseTitle" value={newCourse.courseTitle} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="courseCode" className="col-form-label">Course Code:</label>
                        <input type="text" className="form-control" id="courseCode" name="courseCode" value={newCourse.courseCode} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="courseDescription" className="col-form-label">Course Description:</label>
                        <textarea className="form-control" id="courseDescription" name="courseDescription" value={newCourse.courseDescription} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="courseDuration" className="col-form-label">Course Duration:</label>
                        <input type="text" className="form-control" id="courseDuration" name="courseDuration" value={newCourse.courseDuration} onChange={handleInputChange} required />
                        {errors && (<div className="alert alert-danger mt-1" style={{ padding: '0.3rem', fontSize: '1rem' }}>{errors}</div>)}                 </div>
                </form>
            </div>
            
            <div className="modal-footer" style={{ padding: '0.4rem'}}>
                <button type="button" className="btn btn-secondary" onClick={handleClosecrsEditModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleEditCourse} style={{backgroundColor:"#7E30E1"}}>Edit Course</button>
            </div>
            
        </div>
        
    </div>
    
</div>
<div className={`modal fade ${crsDeleteModal ? 'show' : ''}`} id="deleteCourseModal" tabIndex="-1" aria-labelledby="editCourseModalLabel" aria-hidden="true" style={{ display: crsDeleteModal ? 'block' : 'none', marginTop: '-1%' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosecrsDeleteModal}></button>
            </div>
            
            <div className="modal-body">
                <h1 className="modal-title fs-5" id="editCourseModalLabel">Delete Course</h1>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosecrsDeleteModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleDeleteCourse} style={{backgroundColor:"#7E30E1"}}>Confirm</button>
            </div>
            
        </div>
        
    </div>
    
</div>

</>
    )
}
export default Admincourse;