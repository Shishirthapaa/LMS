import React, {useEffect, useState} from 'react';
import Topbar from '../Component/Topbar';
import Adminnavbar from '../Component/Adminnavbar';
import '../Css/Adminstudent.css';

const Admstudentudent =()=> {
        const [students, setStudents] = useState([]);
        const [selectedStudent, setSelectedStudent] = useState(null);
        const [studentEditModal, setstudentEditModal] = useState(false);
        const [studentDeleteModal, setstudentDeleteModal] = useState(false);
    
        const [newStudent, setNewStudent] = useState({
            studentId: "",
            studentName: "",
            studentEmail: "",
            studentPassword: ""
        });
    
        const[errors, setError] = useState("");
    
        useEffect(() =>{
            fetchStudents();
        },[]);
        const fetchStudents = async () =>{
            try{
                const response = await fetch('https://lms-api-cyan.vercel.app/students/addstudents');
                if(!response.ok){
                    throw new Error('Failed to fetch students.');
                }
                const data = await response.json();
                setStudents(data);
            } catch(error){
                console.error('Error fetching student.', error);
            }
    
        };
        const handleOpenstudentEditModal = (student) =>{
            setstudentEditModal(true);
            setSelectedStudent(student);
            setNewStudent({
                studentId: student.studentId,
                studentName: student.studentName,
                studentEmail: student.email,
                studentPassword: student.password
            });
        }
        const handleClosestudentEditModal = () =>{
            setstudentEditModal(false);
            setSelectedStudent(null);
        }
        const handleOpenstudentDeleteModal = (student) =>{
            setstudentDeleteModal(true);
            setSelectedStudent(student);
        }
        const handleClosestudentDeleteModal = () =>{
            setstudentDeleteModal(false);
            setSelectedStudent(null);
        }
    
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setNewStudent(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        const handleEditStudent = async () => {
            try {console.log('Selected student:', selectedStudent);
    
                if (!selectedStudent || !selectedStudent._id) {
                    setError('No student selected for editing');
                    return;
                }
              const { studentId, studentName, studentEmail, studentPassword } = newStudent;
              const studentData = { studentId, studentName, email: studentEmail, password: studentPassword };
              if (!selectedStudent._id) {
                setError('Selected student does not have a valid ID');
                return;
            } 
              const response = await fetch(`https://lms-api-cyan.vercel.app/students/editstudents/${selectedStudent._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
              });
              if (!response.ok) {
                throw new Error('Failed to edit student');
              }
              const updatedStudent = await response.json();
              const updatedStudents = students.map(student => student._id === updatedStudent._id ? updatedStudent : student);
              setStudents(updatedStudents);
              setSelectedStudent(null);
              setNewStudent({
                studentId: "",
                studentName: "",
                studentEmail: "",
                studentPassword: ""
              });
              setstudentEditModal(false);
              setError("");
            } catch (error) {
              setError('Failed to edit student. Please try again.');
              console.error('Error editing student:', error);
            }
          };
        
          const handleDeleteStudent = async () => {
            try {
              const response = await fetch(`https://lms-api-cyan.vercel.app/students/deletestudents/${selectedStudent._id}`, {
                method: 'DELETE',
              });
              if (!response.ok) {
                throw new Error('Failed to delete student');
              }
              const deletedStudentId = selectedStudent._id;
              const updatedStudents = students.filter(student => student._id !== deletedStudentId);
              setStudents(updatedStudents);
              setSelectedStudent(null);
              setstudentDeleteModal(false);
            } catch (error) {
              console.error('Error deleting student:', error);
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
        <div className='admstudentall'>
            <div className='admstudentinfo'>
                <h3 className='studentinfoo'>Students-Info</h3> 
            </div> 

            <div className="container" style={{ width: '81.6%', margin:'3%' }}>
                <div className="row">
                    <div className="col-md-12 offset-custom mb-3 ">
                    <div className="card" style={{boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.10)'}}>
                        <div className="card-body">
                        <div className="row font-weight-bold" style={{ backgroundColor: '#383A3F', color: 'white', padding: '10px 0' }}>
                            <div className="col">Student ID</div>
                            <div className="col">Student Name</div>
                            <div className="col">Student Email</div>
                            <div className="col">Actions</div>
                        </div>
                        {students.map(student => (
                        <div className="row" key={student._id}>
                            <div className="col">{student.studentId}</div>
                            <div className="col">{student.studentName}</div>
                            <div className="col">{student.email}</div>
                            <div className="col">
                            <button className="btn btn-edit mr-2" onClick={() => handleOpenstudentEditModal(student)}>
                            <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn btn-delete" onClick={() => handleOpenstudentDeleteModal(student)}>
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

<div className={`modal fade ${studentEditModal ? 'show' : ''}`} id="editstudentModal" tabIndex="-1" aria-labelledby="editstudentModalLabel" aria-hidden="true" style={{ display: studentEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="editstudentModalLabel">Edit Student</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosestudentEditModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="studentId" className="col-form-label">Student ID:</label>
                        <input type="string" className="form-control" id="studentId" name="studentId" value={newStudent.studentId} onChange={handleInputChange} required disabled/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="studentName" className="col-form-label">Student Name:</label>
                        <input type="text" className="form-control" id="studentName" name="studentName" value={newStudent.studentName} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="studentEmail" className="col-form-label">Student Email:</label>
                        <input type="email" className="form-control" id="studentEmail" name="studentEmail" value={newStudent.studentEmail} onChange={handleInputChange} required/>
                    </div>
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosestudentEditModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleEditStudent} style={{backgroundColor:"#7E30E1"}}>Edit Student</button>
            </div>
            
        </div>
        
    </div>
    
</div>
<div className={`modal fade ${studentDeleteModal ? 'show' : ''}`} id="deletestudentModal" tabIndex="-1" aria-labelledby="editstudentModalLabel" aria-hidden="true" style={{ display: studentDeleteModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosestudentDeleteModal}></button>
            </div>
            
            <div className="modal-body">
                <h1 className="modal-title fs-5" id="deletestudentModalLabel">Delete student</h1>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosestudentDeleteModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleDeleteStudent} style={{backgroundColor:"#7E30E1"}}>Confirm</button>
            </div>
            
        </div>
        
    </div>
    
        </div>
        </>


    )



}
export default Admstudentudent;