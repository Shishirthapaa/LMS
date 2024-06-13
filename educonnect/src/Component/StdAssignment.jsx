import React, { useEffect, useState } from 'react';
import { Card} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function StdAssignment  () {
    const { _id } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [submitAssignmentModal, setSubmitAssignmentModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState({});

    

        useEffect(() => {
            if (_id) {
                fetchAssignments(_id);
            }
        }, [_id]);
    
       

  const fetchAssignments = async (courseId) => {
    try {
      const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/${courseId}/assignments`);
      if (response.status === 200) {
        setAssignments(response.data);
        const initialSubmisssionStatus = {}; 
        response.data.forEach(assignment => {
            initialSubmisssionStatus[assignment._id] = false; 
            fetchSubmissionStatus(assignment._id);
        });
        setSubmissionStatus(initialSubmisssionStatus);
      } else {
        console.error('Failed to fetch assignments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  }; 
  const handlesubmitAssignment = async () => {
    try {
        const studentId = sessionStorage.getItem('studentId');
        const studentName = sessionStorage.getItem('studentName');
        const courseId = _id;

        if (!studentId || !studentName) {
            throw new Error('Student details not found in local storage');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('studentId', studentId);
        formData.append('studentName', studentName);
        formData.append('assignmentId', selectedAssignment._id); 
        formData.append('fileName', selectedAssignment.name);
        formData.append('filePath', selectedAssignment.path);
        formData.append('isSubmitted', true);
        formData.append('courseId', courseId);

        const response = await axios.post(`https://lms-api-cyan.vercel.app/assignment/submission`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            setSubmitAssignmentModal(false);
            setFile(null);
            setErrors("");
            alert('Assignment Submitted Successfully.')
        } else {
            console.error('Failed to submit assignment:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting assignment:', error);
        setErrors('Error submitting assignment.');
    }
};

const fetchSubmissionStatus = async (assignmentId) => {
    try { 
    
        const studentId = sessionStorage.getItem('studentId');
        const response = await axios.get(`https://lms-api-cyan.vercel.app/assignment/submissionstatus/${assignmentId}/${studentId}`);
        if (response.status === 200) {
            setSubmissionStatus(prevState => ({
                ...prevState,
                [assignmentId]: response.data.isSubmitted
            }));
        } else {
            console.error('Failed to fetch submission status:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error fetching submission status:', error);
        return false;
    }
}


  const handleOpensubmitAssignmentModal = (assignment) =>{
    console.log('Selected Assignment:', assignment)
    setSubmitAssignmentModal(true);
    setSelectedAssignment(assignment);
}
const handleClosesubmitAssignmentModal = () =>{
    setSubmitAssignmentModal(false);
    setSelectedAssignment(null);
    setErrors("");
}
const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};
const formattedDate = selectedAssignment ? new Date(selectedAssignment.date).toISOString().split('T')[0] : '';

const isPastDueDate = (dueDate) => {
    const currentDate = new Date();
    return new Date(dueDate) < currentDate;
};

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
       </div>
       <div className="row justify-content-end">
            <div className="col-auto">
                <Card.Text>
                    <strong>Due Date:</strong> {new Date(assignment.date).toLocaleDateString()}
                </Card.Text>
            </div>
       </div>
       <div className="row justify-content-end">
            <div className="col-auto">
            <button className="btn btn-grade" id="submitassignbtn" type='button' onClick={() => handleOpensubmitAssignmentModal(assignment)} disabled={submissionStatus[assignment._id] || isPastDueDate(assignment.date)}>
            {submissionStatus[assignment._id] ? 'Submitted' : isPastDueDate(assignment.date) ? 'Closed' : 'Submit Assignment'}
            </button>
            </div>
       </div>
   </Card.Body>  
   </Card>
     ))}


<div className={`modal fade ${submitAssignmentModal ? 'show' : ''}`} id="submitAssignmentModal" tabIndex="-1" aria-labelledby="submitAssignmentModallabel" aria-hidden="true" style={{ display: submitAssignmentModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="submitAssignmentModallabel">Submit Assignment</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosesubmitAssignmentModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="assignmentName" className="col-form-label">Assignment Title:</label>
                        <input type="text" className="form-control" id="assignmentName" name="assignmentName" value={selectedAssignment?.name} required disabled/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="assignmentDate" className="col-form-label">Submission Date:</label>
                        <input type="date" className="form-control" id="assignmentDate" name="assignmentDate" value={formattedDate} required  disabled/>
                    </div> 
                    <div className='mb-3'>
                        <label htmlFor="assignmentSubmission" className="col-form-label">Submit your File:</label>
                        <input type="file" className="form-control" id="assignmentSubmission" name="assignmentSubmission" onChange={handleFileChange} required/>
                    </div>
                    {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}   
                    </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosesubmitAssignmentModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handlesubmitAssignment} style={{backgroundColor:"#7E30E1"}}>Submit Assignment</button>
            </div>
            
        </div>
        
    </div>
    
</div>

    </>
  );
};

export default StdAssignment;