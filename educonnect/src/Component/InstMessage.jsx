import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/InstMessage.css';
import SendIcon from '@mui/icons-material/Send';

function InstMessage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupMembers, setGroupMembers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);
    const [loggedInInstructorId, setLoggedInInstructorId] = useState(null);
    const [errors, setErrors] = useState("");
    const [groupDeleteModal, setGroupDeleteModal] = useState(false);
    const [groupAdminName, setGroupAdminName] = useState("");

    useEffect(() => {
        setLoggedInInstructorId(sessionStorage.getItem('instructorId'));
    }, []);

    useEffect(() => {
        fetchGroups();
        fetchStudents();
        fetchInstructors();
    }, []);

    const fetchMessages = async () => {
        try {
            if (!selectedGroup) {
                setMessages([]);
                return;
            }
            const response = await axios.get(`http://localhost:3001/lms/messages/${selectedGroup._id}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:3001/lms/groups');
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3001/lms/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:3001/lms/instructors');
            setInstructors(response.data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
        }
    };

    const handleAddMembersToGroup = async () => {
        try {
            if (!selectedGroup) {
                console.error('No group selected');
                return;
            }
            if (!loggedInInstructorId) {
                console.error('User ID not available');
                return;
            }
            if (selectedGroup.groupAdmin !== loggedInInstructorId) {
                console.error('Only the group admin can add members');
                alert('Only the group admin can add members');
                return;
            }
            console.log('Selected students:', selectedStudents);
            console.log('Selected instructors:', selectedInstructors);

            const studentIds = selectedStudents;
            const instructorIds = selectedInstructors;

            console.log("Request Body:", {
                students: studentIds,
                instructors: instructorIds
            });
            console.log({
                students: selectedStudents,
                instructors: selectedInstructors
            });

            const response = await axios.post(`http://localhost:3001/lms/groups/${selectedGroup._id}/members/add`, {
                students: studentIds,
                instructors: instructorIds,
                userId: loggedInInstructorId
            });
            handleGroupSelection(selectedGroup);
            setSelectedStudents([]);
            setSelectedInstructors([]);
        } catch (error) {
            console.error('Error adding members to group:', error);
        }
    };

    const handleStudentSelection = (e, student) => {
        const { checked } = e.target;
        console.log('selected student:', student)
        if (checked) {
            setSelectedStudents([...selectedStudents, student._id]);
        } else {
            setSelectedStudents(selectedStudents.filter(id => id !== student._id));
        }
    };

    const handleInstructorSelection = (e, instructor) => {
        const { checked } = e.target;
        console.log('selected instructor:', instructor)
        if (checked) {
            setSelectedInstructors([...selectedInstructors, instructor._id]);
        } else {
            setSelectedInstructors(selectedInstructors.filter(id => id !== instructor._id));
        }
    };

    const handleMessageSubmit = async () => {
        try {
            if (!selectedGroup) {
                console.error('No group selected');
                return;
            }

            if (!newMessage.trim()) {
                console.error('Message content is empty');
                return;
            }
            const messageData = {
                senderType: 'Instructor',
                senderId: loggedInInstructorId,
                content: newMessage,
                groupId: selectedGroup._id
            };
            await axios.post('http://localhost:3001/lms/messages', messageData)
            setMessages([...messages, { content: newMessage, senderId: { _id: loggedInInstructorId } }]);
            setNewMessage('');
        } catch (error) {
            console.error('Error submitting message:', error);
        }
    };

    const handleCreateGroup = async () => {
        try {
            if (groupName.trim() === '') {
                alert('Please enter a group name');
                return;
            }
            const response = await axios.post('http://localhost:3001/lms/groups', {
                name: groupName.trim(),
                groupAdmin: loggedInInstructorId,
            });
            fetchGroups();
            setGroupName('');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    const handleGroupSelection = async (group) => {
        setSelectedGroup(group);
        try {
            const response = await axios.get(`http://localhost:3001/lms/groups/${group._id}/members`);
            setGroupMembers(response.data);
            setGroupAdminName(response.data.groupAdmin.instructorName)
            fetchMessages();
        } catch (error) {
            console.error('Error fetching group members:', error);
        }
    };

    const handleRemoveStudent = async (studentId) => {
        try {
            await axios.delete(`http://localhost:3001/lms/groups/${selectedGroup._id}/students/${studentId}`);
            setGroupMembers({
                ...groupMembers,
                students: groupMembers.students.filter(student => student._id !== studentId)
            });
        } catch (error) {
            console.error('Error removing student from group:', error);
        }
    };

    const handleRemoveInstructor = async (instructorId) => {
        try {
            await axios.delete(`http://localhost:3001/lms/groups/${selectedGroup._id}/instructors/${instructorId}`);
            setGroupMembers({
                ...groupMembers,
                instructors: groupMembers.instructors.filter(instructor => instructor._id !== instructorId)
            });
        } catch (error) {
            alert('Cannot remove the Group Admin');
            console.error('Error removing member from group:', error);
        }
    };

    const handleDeleteGroup = async () => {
        try {
            if (!selectedGroup) {
                console.error('No group selected');
                return;
            }
            await axios.delete(`http://localhost:3001/lms/groups/${selectedGroup._id}`);
            fetchGroups();
            setGroupDeleteModal(false);
            setSelectedGroup(null);
        } catch (error) {
            console.error('Error removing group:', error);
        }
    };

    useEffect(() => {
        if (selectedGroup && loggedInInstructorId) {
            const isInstructorInGroup = groupMembers.instructors?.some(member => member._id === loggedInInstructorId);
            if (isInstructorInGroup) {
                fetchMessages();
            }
        }
    }, [selectedGroup, loggedInInstructorId, groupMembers]);

    const handleOpenGroupDeleteModal = (group) => {
        setGroupDeleteModal(true);
        setSelectedGroup(group);
    };

    const handleCloseGroupDeleteModal = () => {
        setGroupDeleteModal(false);
        setSelectedGroup(null);
        setErrors("");
    };

    return (
        <>
            <div className='instmessagecontainer'>
                <div className='instgroupnames'>
                    <div className='instgrouplist'>
                        <h4>Groups</h4>
                        <ul>
                            {groups.map((group) => (
                                <li className="groupnamelink d-flex justify-content-between align-items-center" key={group.id} onClick={() => handleGroupSelection(group)}>
                                    <span>{group.name}</span>
                                    {loggedInInstructorId === group.groupAdmin && (
                                        <button className="btn btn-delete" onClick={() => handleOpenGroupDeleteModal(group)}>
                                            <i className="fa-solid fa-trash" style={{ fontSize: '20px' }}></i>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='instcreategroup'>
                        <input className='groupnameinput'
                            type="text"
                            placeholder="Enter group name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <button id="creategroupbtn" onClick={handleCreateGroup}>Create</button>
                    </div>
                </div>

                <div className='instlivechat'>
                    <div className='instchatgroupname'>
                        <h4>{selectedGroup ? `${selectedGroup.name}` : 'Select a group'}</h4>
                    </div>
                    {selectedGroup && (
                        <>
                            {groupMembers.instructors?.some(member => member._id === loggedInInstructorId) ? (
                                <>
                                    <div className='instchatalllive'>
                                        {messages.map((message, index) => (
                                            <div key={index} className={`instchatbubble ${message.senderId && message.senderId._id.toString() === loggedInInstructorId ? 'instchatbubbleright' : 'instchatbubbleleft'}`}>
                                                {message.senderId && message.senderId._id.toString() !== loggedInInstructorId && (
                                                    <p className='instsendername'>{message.senderType === 'Instructor' ? (message.senderId ? message.senderId.instructorName : 'Unknown Instructor') : (message.senderId ? message.senderId.studentName : 'Unknown Student')}</p>
                                                )}
                                                <p className='instcontent'>{message.content}</p>
                                                {/* <p>{message.createdAt}</p> */}
                                            </div>
                                        ))}
                                    </div>
                                    <div className='instchatdiv'>
                                        <input
                                            type="text"
                                            className='chatboxinput'
                                            placeholder='Send a Message'
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <SendIcon style={{ fontSize: '40px', color: "#7E30E1" }} className="sendmessageicon" onClick={handleMessageSubmit} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className='instnotaddedtogrp'>You are not added to the Group</h3>
                                    <p>(Please ask the Group Admin to add you)</p>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className='instgroupmembers'>
                    <h5>Members</h5>
                    <div className='instmemberslist'>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 style={{ fontSize: '17px', marginRight: 'auto' }}>Group Admin:</h5>
                            <h5 style={{ fontSize: '17px', marginRight: '3%', color: 'Green' }}>{groupAdminName}</h5>
                        </div>
                        <ul>
                            {groupMembers.students && groupMembers.students.map((student) => (
                                <li key={student._id} className="d-flex justify-content-between align-items-center" style={{ fontSize: '17px' }}>
                                    <span>{student.studentName}</span>
                                    {loggedInInstructorId === selectedGroup?.groupAdmin && (
                                        <button className="btn btn-delete" onClick={() => handleRemoveStudent(student._id)}>
                                            <i className="fa-solid fa-trash" style={{ fontSize: '19px' }}></i>
                                        </button>
                                    )}
                                </li>
                            ))}
                            {groupMembers.instructors && groupMembers.instructors.map((instructor) => (
                                <li key={instructor._id} className="d-flex justify-content-between align-items-center" style={{ fontSize: '17px' }}>
                                    <span>{instructor.instructorName}</span>
                                    {loggedInInstructorId === selectedGroup?.groupAdmin && (
                                        <button className="btn btn-delete" onClick={() => handleRemoveInstructor(instructor._id)}>
                                            <i className="fa-solid fa-trash" style={{ fontSize: '20px' }}></i>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='inststudentlist'>
                        <h5>Students</h5>
                        <ul>
                            {students.map((student, index) => (
                                <li key={index}>
                                    <input type="checkbox" onChange={(e) => handleStudentSelection(e, student)} checked={selectedStudents.includes(student._id)} disabled={groupMembers.students?.some((member) => member._id === student._id)} />
                                    {student.studentName}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='instinstructorlist'>
                        <h5>Instructors</h5>
                        <ul>
                            {instructors.map((instructor, index) => (
                                <li key={index}>
                                    <input type="checkbox" onChange={(e) => handleInstructorSelection(e, instructor)} checked={selectedInstructors.includes(instructor._id)} disabled={groupMembers.instructors?.some((member) => member._id === instructor._id)} />
                                    {instructor.instructorName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="addmembersbtn" onClick={handleAddMembersToGroup}>Add to Group</button>
                </div>
            </div>
            <div className={`modal fade ${groupDeleteModal ? 'show' : ''}`} id="deleteGroupModal" tabIndex="-1" aria-labelledby="deleteGroupModalLabel" aria-hidden="true" style={{ display: groupDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseGroupDeleteModal}></button>
                        </div>

                        <div className="modal-body">
                            <h1 className="modal-title fs-5" id="deleteGroupModalLabel">Delete Group</h1>
                        </div>
                        <div className="mb-3">
                            {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseGroupDeleteModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleDeleteGroup} style={{ backgroundColor: "#7E30E1" }}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InstMessage;
