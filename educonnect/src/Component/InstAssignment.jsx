import React, { useEffect, useState } from 'react';
import { Card} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InstAssignment  () {
    const { _id } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignmentEditModal, setAssignmentEditModal] = useState(false);
    const [assignmentDeleteModal, setAssignmentDeleteModal] = useState(false);
    const [errors, setErrors] = useState("");


    useEffect(() => {
        fetchAssignments(_id);
      }, [_id]);

  const fetchAssignments = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3001/courses/${courseId}/assignments`);
      if (response.status === 200) {
        setAssignments(response.data);
      } else {
        console.error('Failed to fetch assignments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  }; 

  const handleEditAssignment = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/courses/assignments/${selectedAssignment._id}`, {
        assignmentName: selectedAssignment.name,
        assignmentDescription: selectedAssignment.description, 
        assignmentDate: selectedAssignment.date
      });
      
      if (response.status === 200) {
        setAssignmentEditModal(false);
        setSelectedAssignment(null);
        fetchAssignments(_id);
        setErrors("");
      } else {
        console.error('Failed to update assignment:', response.statusText);
      }
    } catch (error) {
      setErrors('Error updating assignment.');
      console.error('Error updating assignment:', error);
    }
    
  };
  const handleDeleteAssignment = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/courses/assignments/${selectedAssignment._id}`);
      
      if (response.status === 200) {
        setAssignmentDeleteModal(false);
        setSelectedAssignment(null);
        fetchAssignments(_id);
        setErrors("");
      } else {
        console.error('Failed to delete Assignment:', response.statusText);
      }
    } catch (error) {
      setErrors('Error deleting Assignment:');
      console.error('Error deleting Assignment:', error);
    } 
  };
  const handleOpenassignmentEditModal = (assignment) =>{
    setAssignmentEditModal(true);
    setSelectedAssignment(assignment);
}
const handleCloseassignmentEditModal = () =>{
    setAssignmentEditModal(false);
    setSelectedAssignment(null);
    setErrors("");
}
const handleOpenassignmentDeleteModal = (assignment) =>{
    setAssignmentDeleteModal(true);
    setSelectedAssignment(assignment);
}
const handleCloseassignmentDeleteModal = () =>{
    setAssignmentDeleteModal(false);
    setSelectedAssignment(null);
    setErrors("");

}
  return (
    <>
    {assignments && assignments.map((assignment) => (
   <Card key={assignment._id} style={{ minwidth: '58rem', marginBottom: '20px', width:'auto', boxShadow:'0 2px 4px 0 rgba(0,0,0,0.2)' }}>
   <Card.Body>
       <div className="row align-items-start">
           <div className="col" style={{ textAlign: 'left' }}>
               <Card.Title className="text-left"><strong>{assignment.name}</strong></Card.Title>
               <Card.Text className="text-left">{assignment.description}</Card.Text>
           </div>
           <div className='col-auto ml-auto'>
               <button className="btn btn-edit" onClick={() => handleOpenassignmentEditModal(assignment)}>
                   <i className="fa-solid fa-pen"></i>
               </button>
               <button className="btn btn-delete ml-2" onClick={() => handleOpenassignmentDeleteModal(assignment)}>
                   <i className="fa-solid fa-trash"></i>
               </button>
           </div>
       </div>
       <div className="row justify-content-end">
            <div className="col-auto">
                <Card.Text>
                    <strong>Due Date:</strong> {new Date(assignment.date).toLocaleDateString()}
                </Card.Text>
            </div>
       </div>
   </Card.Body>  
   </Card>
     ))}


    <div className={`modal fade ${assignmentEditModal ? 'show' : ''}`} id="editAssignmentModal" tabIndex="-1" aria-labelledby="editAssignmentModalLabel" aria-hidden="true" style={{ display: assignmentEditModal ? 'block' : 'none' }}>
    <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="editFoldarModalLabel">Edit Assignment</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseassignmentEditModal}></button>
        </div>
        
        <div className="modal-body">
            <form>
                    <div className="mb-3">
                        <label htmlFor="assignmentName" className="col-form-label">Assignment Title:</label>
                        <input type="text" className="form-control" id="assignmentName" name="assignmentName" value={selectedAssignment?.name} onChange={(e) => setSelectedAssignment({ ...selectedAssignment, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="assignmentDescription" className="col-form-label">Assignment Description:</label>
                        <textarea className="form-control" id="assignmentDescription" name="assignmentDescription" value={selectedAssignment?.description} onChange={(e) => setSelectedAssignment({ ...selectedAssignment, description: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="assignmentDate" className="col-form-label">Submission Date:</label>
                        <input type="date" className="form-control" id="assignmentDate" name="assignmentDate" value={selectedAssignment?.date} onChange={(e) => setSelectedAssignment({ ...selectedAssignment, date: e.target.value })} required  />
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}   
                    </div> 
            </form>
        </div>
        
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseassignmentEditModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleEditAssignment} style={{backgroundColor:"#7E30E1"}}>Edit Assignment</button>
        </div>
        
    </div>
    
    </div>
    
    </div>
    <div className={`modal fade ${assignmentDeleteModal ? 'show' : ''}`} id="deleteAssignmentModal" tabIndex="-1" aria-labelledby="editAssignmentModalLabel" aria-hidden="true" style={{ display: assignmentDeleteModal ? 'block' : 'none' }}>
    <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
        <div className="modal-header">
            
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseassignmentDeleteModal}></button>
        </div>
        
        <div className="modal-body">
            <h1 className="modal-title fs-5" id="deleteAssignmentModalLabel">Delete Assignment</h1>
        </div>
        <div className="mb-3">
          {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseassignmentDeleteModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleDeleteAssignment} style={{backgroundColor:"#7E30E1"}}>Confirm</button>
        </div>
        
    </div>
    
    </div>
    
    </div>
    </>
  );
};

export default InstAssignment;