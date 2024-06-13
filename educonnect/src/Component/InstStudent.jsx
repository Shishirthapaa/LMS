import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from 'axios';

function InstStudent  () {
    const { _id } = useParams();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [errors, setErrors] = useState("");
    const [grades, setGrades] = useState([]);
    const [showGradeModal, setShowGradeModal] = useState(false);

    

        useEffect(() => {
            if (_id) {
                fetchStudents(_id);
            }
        }, [_id]);
    
       

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/students`);
      if (response.status === 200) {
        setStudents(response.data);
      } else {
        console.error('Failed to fetch students:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  }; 
  const handleViewProgress = (studentId) => {
    setSelectedStudent(studentId);
    fetchGrades(_id, studentId);
    setShowGradeModal(true);

  }
  const fetchGrades = async (courseId, studentId) => {
    try {
        const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/${courseId}/progress`, {
            params: { studentId }
        });
        if (response.status === 200) {
            setGrades(response.data);
        } else {
          setGrades('No progress')
            setErrors("Failed to fetch grade");
            console.error('Failed to fetch grades:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching grades:', error);
        setErrors("Error fetching grade");
    }
};

const handleCloseshowGradeModal = () =>{
  setShowGradeModal(false);
  setErrors("");
}


  return (
    <>
    <div className="container" style={{ width: '100%', margin: '1%' }}>
    <div className="row">
        <div className="col-md-12 offset-custom mb-3 ">
            <div className="card" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)' }}>
                <div className="card-body">
                    <div className="row font-weight-bold" style={{ backgroundColor: '#383A3F', color: 'white', padding: '10px 0' }}>
                        <div className="col">SN</div>
                        <div className="col">Student ID</div>
                        <div className="col">Student Name</div>
                        <div className="col">Action</div>
                    </div>
                    {students.map((student, index) => (
                        <div className="row" key={student._id} style={{ marginBottom: '15px', marginTop: '15px' }}>
                            <div className="col">{index + 1}</div>
                            <div className="col">{student.studentId}</div>
                            <div className="col">{student.studentName}</div>
                            <div className="col">
                                <button id="instviewprogressbtn" className="btn btn-primary" onClick={() => handleViewProgress(student._id)}>View Progress</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</div>



<div className={`modal fade ${showGradeModal ? 'show' : ''}`} id="showGradeModal" tabIndex="-1" aria-labelledby="showGradeModallabel" aria-hidden="true" style={{ display: showGradeModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="showGradeModallabel">Progress</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseshowGradeModal}></button>
            </div>
            
            <div className="modal-body">
                <div>
                { grades.length > 0 ? (grades.map((grade) => (
                  <Card key={grade._id} style={{ minwidth: '58rem', marginBottom: '20px', width:'auto', backgroundColor:'#f2f1f1' }}>
                  <Card.Body>
                      <div className="row align-items-start">
                          <div className="col" style={{ textAlign: 'left' }}>
                              <Card.Title className="text-left">{grade.assignmentId.name}</Card.Title>
                          </div>
                          <div className='col-auto ml-auto'>
                          <Card.Title className="text-right" style={{color:'#7E30E1'}}>Marks: {grade.achievedMarks} / {grade.fullMarks} </Card.Title>
                          </div>
                      </div>
                  </Card.Body>  
                  </Card>
                  ))
                ) : (
                  <div><h4 style={{color:'red'}}>No Progress</h4>  </div>
                )}
                    
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}   
                            
                </div>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseshowGradeModal}>Close</button>
            </div>
            
        </div>
        
    </div>
    
</div>
     

    </>
  );
};

export default InstStudent;


