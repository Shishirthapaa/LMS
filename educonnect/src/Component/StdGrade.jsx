import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function StdGrade() {
    const { _id } = useParams();
    const [grades, setGrades] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchGrade(_id);
    },[_id]);

    const fetchGrade = async (courseId) => {
        try {
            const studentId = sessionStorage.getItem('studentId');
            const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/${courseId}/grades` , {
                 params: { studentId }
                });
            if (response.status === 200) {
                setGrades(response.data);
            } else {
                console.error('Failed to fetch grade:', response.statusText);
                setError("Failed to fetch grade");
            }
        } catch (error) {
            console.error('Error fetching grade:', error);
            setError("Error fetching grade");
        }
    };

    return (
        <>
            {grades.map((grade) => ( 
                <Card key={grade._id} style={{ minwidth: '58rem', marginBottom: '20px', width: 'auto', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)' }}>
                    <Card.Body>
                        <div className="row align-items-start">
                            <div className="col" style={{ textAlign: 'left' }}>
                                <Card.Title className="text-left"><strong>{grade.assignmentId ? grade.assignmentId.name : 'Unknown Assignment'}</strong></Card.Title>
                            </div>
                            <div className='col-auto ml-auto'>
                                <Card.Title className="text-right">Submitted By: {grade.studentName}</Card.Title>
                            </div>
                        </div>
                        <div className='row justify-content-start'>
                        <Card.Text className="text-left" style={{color:'#e30202'}}>Full Marks: {grade.fullMarks}</Card.Text>
                        <Card.Text className="text-left" style={{color:'#0cb339'}}>Achieved Marks: {grade.achievedMarks}</Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default StdGrade;
