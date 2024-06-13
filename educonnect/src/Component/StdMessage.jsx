import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/StdMessage.css';
import SendIcon from '@mui/icons-material/Send';

function StdMessage() {
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
    const [loggedInStudentId, setLoggedInStudentId] = useState(null);
    const [groupAdminName, setGroupAdminName] = useState("");

    axios.defaults.withCredentials = true;

    useEffect(() => {
        setLoggedInStudentId(sessionStorage.getItem('studentId'));
    }, []);


    useEffect(() => {
        fetchMessages();
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
            const response = await axios.get(`https://lms-api-cyan.vercel.app/lms/messages/${selectedGroup._id}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    const fetchGroups = async () => {
        try {
            const response = await axios.get('https://lms-api-cyan.vercel.app/lms/groups');
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };
    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://lms-api-cyan.vercel.app/lms/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchInstructors = async () => {
        try {
            const response = await axios.get('https://lms-api-cyan.vercel.app/lms/instructors');
            setInstructors(response.data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
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
                senderType: 'Student',
                senderId: loggedInStudentId,
                content: newMessage,
                groupId: selectedGroup._id
            }; 
            await axios.post('https://lms-api-cyan.vercel.app/lms/messages', messageData);
            setMessages([...messages, { content: newMessage, senderId: { _id: loggedInStudentId }}]);
            setNewMessage('');
        } catch (error) {
            console.error('Error submitting message:', error);
        }
    };

    const handleGroupSelection = async (group) => {
        setSelectedGroup(group);
        try {
            const response = await axios.get(`https://lms-api-cyan.vercel.app/lms/groups/${group._id}/members`);
            setGroupMembers(response.data);
            setGroupAdminName(response.data.groupAdmin.instructorName)
        } catch (error) {
            console.error('Error fetching group members:', error);
        }
    };
    useEffect(() => {
        if (selectedGroup && loggedInStudentId) {
            const isStudentInGroup = groupMembers.students?.some(member => member._id === loggedInStudentId);
            if (isStudentInGroup) {
                 fetchMessages();
            }
        }
    }, [selectedGroup, loggedInStudentId, groupMembers]);

    return (
        <div className='stdmessagecontainer'>
            <div className='stdgroupnames'>
                <div className='stdgrouplist'>
                <h4>Groups</h4>
                <ul>
                    {groups.map((group) => (
                        <li className="groupnamelink" key={group.id} onClick={() => handleGroupSelection(group)}>
                            {group.name}
                        </li>
                    ))}
                </ul>
                </div> 
             </div>

            
            <div className='stdlivechat'>
                <div className='stdchatgroupname'>
                <h4 >{selectedGroup ? `${selectedGroup.name}` : 'Select a group'}</h4>
                </div>
                {selectedGroup && (
                <>
                {groupMembers.students?.some(member => member._id === loggedInStudentId) ? (
                    <>
                <div className='stdchatalllive'>
                    {messages.map((message, index) => (
                        <div key={index} className={`stdchatbubble ${message.senderId && message.senderId._id.toString() === loggedInStudentId ? 'stdchatbubbleright' : 'stdchatbubbleleft'}`}>
                            {message.senderId && message.senderId._id.toString() !== loggedInStudentId && (
                                <p className='stdsendername'>{message.senderType === 'Student' ? (message.senderId ? message.senderId.studentName: 'Unknown Student') : (message.senderId ? message.senderId.instructorName : 'Unknown Instructor')}</p>
                            )}
                                <p className='stdcontent'>{message.content}</p>
                            {/* <p>{message.createdAt}</p> */}
                        </div>
                    ))}
                </div>
                <div className='stdchatdiv'>
                    <input
                        type="text"
                        className='chatboxinput'
                        placeholder='Send a Message'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <SendIcon style={{fontSize:'40px', color:"#7E30E1"}} className="sendmessageicon" onClick={handleMessageSubmit}/>
                </div>
                </>
                ) : (
                    <>
                    <h3 className='instnotaddedtogrp'>You are not added to the Group</h3>
                    <p>(Please ask your instructor to add you)</p>
                    </>
                )}
                
                 
                 </>
                )}
            </div>

            <div className='stdgroupmembers'>
                <h4>Members</h4>
                <div className='stdmemberslist'>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 style={{ fontSize: '17px', marginRight: 'auto' }}>Group Admin:</h5>
                    <h5 style={{ fontSize: '17px', marginRight:'3%', color:'Green' }}>{groupAdminName}</h5>
                </div> 
                <ul>
                    {groupMembers.students && groupMembers.students.map((student) => (
                        <li key={student._id}>{student.studentName}</li>
                    ))}
                    {groupMembers.instructors && groupMembers.instructors.map((instructor) => (
                        <li key={instructor._id}>{instructor.instructorName}</li>
                    ))}
                </ul>
                </div> 


            </div>
        </div>
    );
}

export default StdMessage;
