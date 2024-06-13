import React, {useEffect, useState} from 'react';
import Topbar from '../Component/Topbar';
import Adminnavbar from '../Component/Adminnavbar';
import '../Css/Admininstructor.css';

const AdminInstructor =()=> {
    const [instructors, setInstructors] = useState([]);
    const [instructorModal, setinstructorModal] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [instEditModal, setinstEditModal] = useState(false);
    const [instDeleteModal, setinstDeleteModal] = useState(false);

    const [newInstructor, setNewInstructor] = useState({
        instructorId: "",
        instructorName: "",
        instructorEmail: "",
        instructorPassword: ""
    });

    const[errors, setError] = useState("");

    useEffect(() =>{
        fetchInstructors();
    },[]);
    const fetchInstructors = async () =>{
        try{
            const response = await fetch('https://lms-api-cyan.vercel.app/instructors/addinstructors');
            if(!response.ok){
                throw new Error('Failed to fetch instructors.');
            }
            const data = await response.json();
            setInstructors(data);
        } catch(error){
            console.error('Error fetching instructor.', error);
        }

    };
    const handleOpenInstModal = () => {
        setinstructorModal(true);
    }
    const handleCloseInstModal = () => {
        setinstructorModal(false);
        setNewInstructor({
            instructorId: "",
            instructorName: "",
            instructorEmail: "",
            instructorPassword: ""

        });
    }
    const handleOpeninstEditModal = (instructor) =>{
        setinstEditModal(true);
        setSelectedInstructor(instructor);
        setNewInstructor({
            instructorId: instructor.instructorId,
            instructorName: instructor.instructorName,
            instructorEmail: instructor.email,
            instructorPassword: instructor.password
        });
    }
    const handleCloseinstEditModal = () =>{
        setinstEditModal(false);
        setSelectedInstructor(null);
    }
    const handleOpeninstDeleteModal = (instructor) =>{
        setinstDeleteModal(true);
        setSelectedInstructor(instructor);
    }
    const handleCloseinstDeleteModal = () =>{
        setinstDeleteModal(false);
        setSelectedInstructor(null);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInstructor(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleAddInstructor = async () => {
        if (!newInstructor.instructorId || !newInstructor.instructorName || !newInstructor.instructorEmail || !newInstructor.instructorPassword){
            setError("Please fill in all fields.");
            return;
        }
        try {
            const response = await fetch('https://lms-api-cyan.vercel.app/instructors/addinstructors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newInstructor),
            });
            if (!response.ok) {
                throw new Error('Failed to add instructor');
            }
                const data = await response.json();
                setInstructors([...instructors, data]);
                setNewInstructor({
                    instructorId: "",
                    instructorName: "",
                    instructorEmail: "",
                    instructorPassword: ""
                });
                setError("");
                handleCloseInstModal();
            
        } catch (error) {
            setError('Failed to add Instructor! Instructor already exists.');
            console.error('Error adding instructor:', error);
        }
    }
    const handleEditInstructor = async () => {
        try {console.log('Selected Instructor:', selectedInstructor);

            if (!selectedInstructor || !selectedInstructor._id) {
                setError('No instructor selected for editing');
                return;
            }
          const { instructorId, instructorName, instructorEmail, instructorPassword } = newInstructor;
          const instructorData = { instructorId, instructorName, email: instructorEmail, password: instructorPassword };
          if (!selectedInstructor._id) {
            setError('Selected instructor does not have a valid ID');
            return;
        } 
          const response = await fetch(`https://lms-api-cyan.vercel.app/instructors/editinstructors/${selectedInstructor._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(instructorData),
          });
          if (!response.ok) {
            throw new Error('Failed to edit instructor');
          }
          const updatedInstructor = await response.json();
          const updatedInstructors = instructors.map(instructor => instructor._id === updatedInstructor._id ? updatedInstructor : instructor);
          setInstructors(updatedInstructors);
          setSelectedInstructor(null);
          setNewInstructor({
            instructorId: "",
            instructorName: "",
            instructorEmail: "",
            instructorPassword: ""
          });
          setinstEditModal(false);
          setError("");
        } catch (error) {
          setError('Failed to edit instructor. Please try again.');
          console.error('Error editing instructor:', error);
        }
      };
    
      const handleDeleteInstructor = async () => {
        try {
          const response = await fetch(`https://lms-api-cyan.vercel.app/instructors/deleteinstructors/${selectedInstructor._id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete instructor');
          }
          const deletedInstructorId = selectedInstructor._id;
          const updatedInstructors = instructors.filter(instructor => instructor._id !== deletedInstructorId);
          setInstructors(updatedInstructors);
          setSelectedInstructor(null);
          setinstDeleteModal(false);
        } catch (error) {
          console.error('Error deleting instructor:', error);
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
        <div className='adminstructorall'>
            <div className='adminstructorinfo'>
                <h3 className='instructorinfoo'>Instructor-Info</h3> 
            </div>
            <button id="addinstructorbtn" type='button' onClick={handleOpenInstModal}>Add Instructor</button> 

            <div className="container" style={{ width: '81.6%', margin:'1.5%' }}>
                <div className="row">
                    <div className="col-md-12 offset-custom mb-3 ">
                    <div className="card" style={{boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.10)'}}>
                        <div className="card-body">
                        <div className="row font-weight-bold" style={{ backgroundColor: '#383A3F', color: 'white', padding: '10px 0' }}>
                            <div className="col">Instructor ID</div>
                            <div className="col">Instructor Name</div>
                            <div className="col">Instructor Email</div>
                            <div className="col">Actions</div>
                        </div>
                        {instructors.map(instructor => (
                        <div className="row" key={instructor._id}>
                            <div className="col">{instructor.instructorId}</div>
                            <div className="col">{instructor.instructorName}</div>
                            <div className="col">{instructor.email}</div>
                            <div className="col">
                            <button className="btn btn-edit mr-2" onClick={() => handleOpeninstEditModal(instructor)}>
                            <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn btn-delete" onClick={() => handleOpeninstDeleteModal(instructor)}>
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
        <div className={`modal fade ${instructorModal ? 'show' : ''}`} id="addInstructorModal" tabIndex="-1" aria-labelledby="addInstructorModalLabel" aria-hidden="true" style={{ display: instructorModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="addInstructorModalLabel">Add New Instructor</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseInstModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="instructorId" className="col-form-label">Instructor ID:</label>
                        <input type="string" className="form-control" id="instructorId" name="instructorId" value={newInstructor.instructorId} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="instructorName" className="col-form-label">Instructor Name:</label>
                        <input type="text" className="form-control" id="instructorName" name="instructorName" value={newInstructor.instructorName} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="instructorEmail" className="col-form-label">Instructor Email:</label>
                        <input type="email" className="form-control" id="instructorEmail" name="instructorEmail" value={newInstructor.instructorEmail} onChange={handleInputChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="instructorPassword" className="col-form-label">Instructor Password:</label>
                        <input type="password" className="form-control" id="instructorPassword" name="instructorPassword" value={newInstructor.instructorPassword} onChange={handleInputChange} required />
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}</div>
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseInstModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleAddInstructor} style={{backgroundColor:"#7E30E1"}}>Add Instructor</button>
            </div>
            
        </div>
        
    </div>
    
</div>

<div className={`modal fade ${instEditModal ? 'show' : ''}`} id="editInstructorModal" tabIndex="-1" aria-labelledby="editInstructorModalLabel" aria-hidden="true" style={{ display: instEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="editInstructorModalLabel">Edit Instructor</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseinstEditModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="instructorId" className="col-form-label">Instructor ID:</label>
                        <input type="string" className="form-control" id="instructorId" name="instructorId" value={newInstructor.instructorId} onChange={handleInputChange} required disabled/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="instructorName" className="col-form-label">Instructor Name:</label>
                        <input type="text" className="form-control" id="instructorName" name="instructorName" value={newInstructor.instructorName} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="instructorEmail" className="col-form-label">Instructor Email:</label>
                        <input type="email" className="form-control" id="instructorEmail" name="instructorEmail" value={newInstructor.instructorEmail} onChange={handleInputChange} required/>
                    </div>
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseinstEditModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleEditInstructor} style={{backgroundColor:"#7E30E1"}}>Edit Instructor</button>
            </div>
            
        </div>
        
    </div>
    
</div>
<div className={`modal fade ${instDeleteModal ? 'show' : ''}`} id="deleteInstructorModal" tabIndex="-1" aria-labelledby="editInstructorModalLabel" aria-hidden="true" style={{ display: instDeleteModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseinstDeleteModal}></button>
            </div>
            
            <div className="modal-body">
                <h1 className="modal-title fs-5" id="deleteInstructorModalLabel">Delete Instructor</h1>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseinstDeleteModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleDeleteInstructor} style={{backgroundColor:"#7E30E1"}}>Confirm</button>
            </div>
            
        </div>
        
    </div>
    
        </div>

        </>


    )



}
export default AdminInstructor;