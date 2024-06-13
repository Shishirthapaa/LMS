import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InstGrade() {
    const { _id } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [gradeSubmissionModal, setGradeSubmissionModal] = useState(false);
    const [gradingStatus, setGradingStatus] = useState({});
    const [errors, setErrors] = useState("");
    const marksRegex = /^(100|[1-9][0-9]?)$/;

    useEffect(() => {
        fetchSubmissions(_id);
    }, [_id]);

    const fetchSubmissions = async (courseId) => {
        try {
            const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/${courseId}/submittedassignments`);
            if (response.status === 200) {
                setSubmissions(response.data);
                const initialGradingStatus = {};
                response.data.forEach(submission => {
                    initialGradingStatus[submission._id] = false;
                    checkSubmissionGradingStatus(submission._id);
                });
                setGradingStatus(initialGradingStatus);
            } else {
                console.error('Failed to fetch submissions:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    const handleGradeSubmission = async () => {
        if (!marksRegex.test(selectedSubmission.fullMarks) || !marksRegex.test(selectedSubmission.achievedMarks)) {
            setErrors('Please enter valid marks.');
            return;
        }
        try {
            const response = await axios.post(`https://lms-api-cyan.vercel.app/courses/${selectedSubmission.courseId}/gradedsubmissions`, {
                courseId: selectedSubmission.courseId,
                assignmentId: selectedSubmission.assignmentId,
                studentId: selectedSubmission.studentId,
                studentName: selectedSubmission.studentName,
                submissionId: selectedSubmission._id,
                fullMarks: selectedSubmission.fullMarks,
                achievedMarks: selectedSubmission.achievedMarks
            });

            if (response.status === 200) {
                setGradeSubmissionModal(false);
                setSelectedSubmission(null);
                fetchSubmissions(_id);
                alert("Submission Graded Successfully.")
                setErrors("");
            } else {
                console.error('Failed to update submission:', response.statusText);
            }
        } catch (error) {
            setErrors('Error updating submission.');
            console.error('Error updating submission:', error);
        }

    };

    const handleOpenGradeSubmissionModal = (submission) => {
        setGradeSubmissionModal(true);
        setSelectedSubmission(submission);
    }
    const handleCloseGradeSubmissionModal = () => {
        setGradeSubmissionModal(false);
        setSelectedSubmission(null);
        setErrors("");
    }
    const handleFileClick = (submission) => {
        const fileUrl = `https://lms-api-cyan.vercel.app/submissions/${submission.fileName}`;
        window.open(fileUrl, '_blank');
    }
    const checkSubmissionGradingStatus = async (submissionId) => {
        try {
            const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/checkSubmissionGradingStatus?submissionId=${submissionId}`)
            if (response.status === 200) {
                setGradingStatus(prevState => ({
                    ...prevState,
                    [submissionId]: response.data.isGraded
                }));
            } else {
                console.error('Failed to fetch submission grading status:', response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error checking submission grading status:', error);
            return false;
        }
    };
    return (
        <>
            {submissions && submissions.map((submission) => (
                <Card key={submission._id} style={{ minwidth: '58rem', marginBottom: '20px', width: 'auto', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)' }}>
                    <Card.Body>
                        <div className="row align-items-start">
                            <div className="col" style={{ textAlign: 'left' }}>
                                <Card.Title className="text-left"><strong>{submission.assignmentId?.name}</strong></Card.Title>
                            </div>
                            <div className='col-auto ml-auto'>
                                <Card.Title className="text-right">Submitted By: {submission.studentName}</Card.Title>
                            </div>
                        </div>
                        <div className='row justify-content-start'>
                            <Card.Text className="text-left" onClick={() => handleFileClick(submission)} style={{ cursor: 'pointer', fontSize: '20px' }}>{submission.fileName}</Card.Text>
                            <text><a style={{ textDecoration: 'none', fontSize: '18px', color: '#7E30E1' }} href={`https://lms-api-cyan.vercel.app/submissions/${submission.fileName}`} target="_blank" rel="noopener noreferrer">View File</a></text>
                        </div>
                        <div className="row justify-content-end" >
                            <div className="col-auto">
                                <button className="btn btn-grade" id='gradebtn' onClick={() => handleOpenGradeSubmissionModal(submission)} disabled={gradingStatus[submission._id]} >
                                    {gradingStatus[submission._id] ? 'Graded' : 'Grade'}
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}

            <div className={`modal fade ${gradeSubmissionModal ? 'show' : ''}`} id="GradeSubmissionModal" tabIndex="-1" aria-labelledby="GradeSubmissionModalLabel" aria-hidden="true" style={{ display: gradeSubmissionModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editFoldarModalLabel">Grade Submission</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseGradeSubmissionModal}></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="assignmentName" className="col-form-label">Assignment Title:</label>
                                    <input type="text" className="form-control" id="assignmentName" name="assignmentName" value={selectedSubmission?.assignmentId?.name} required disabled />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="studentName" className="col-form-label">Submitted By:</label>
                                    <input type="text" className="form-control" id="studentName" name="studentName" value={selectedSubmission?.studentName} required disabled />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fullMarks" className="col-form-label">Full Marks (1-100): </label>
                                    <input type="number" className="form-control" id="fullMarks" name="fullMarks" onChange={(e) => setSelectedSubmission({ ...selectedSubmission, fullMarks: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="achievedMarks" className="col-form-label">Achieved Marks (1-100):</label>
                                    <input type="number" className="form-control" id="achievedMarks" name="achievedMarks" onChange={(e) => setSelectedSubmission({ ...selectedSubmission, achievedMarks: e.target.value })} required />
                                    {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseGradeSubmissionModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleGradeSubmission} style={{ backgroundColor: "#7E30E1" }}>Grade submission</button>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default InstGrade;
