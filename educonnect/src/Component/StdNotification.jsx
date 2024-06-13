import React, { useEffect, useState } from 'react';
import { Card} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function StdNotifications  () {
    const { _id } = useParams();
    const [notifications, setNotifications] = useState([]);
    const [errors, setErrors] = useState("");


    useEffect(() => {
        fetchNotifications(_id);
      }, [_id]);

  const fetchNotifications = async (courseId) => {
    try {
      const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/${courseId}/notifications`);
      if (response.status === 200) {
        setNotifications(response.data);
      } else {
        console.error('Failed to fetch notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }; 

  return (
    <>
    {notifications && notifications.map((notification) => (
   <Card key={notification._id} style={{ minwidth: '58rem', marginBottom: '20px', width:'auto', boxShadow:'0 2px 4px 0 rgba(0,0,0,0.2)' }}>
   <Card.Body>
       <div className="row align-items-start">
           <div className="col" style={{ textAlign: 'left' }}>
               <Card.Text className="text-left">{notification.description}</Card.Text>
           </div>

       </div>
       <div className="row justify-content-between" style={{marginTop:'1.5%'}}>
            <div className="col-auto">
                <Card.Text>
                    <strong>Notified By:</strong>  <span className="notifiedteacher">{notification.teacher}</span>
                </Card.Text>
            </div>
            <div className="col-auto">
                <Card.Text>
                    <strong>Notified On:</strong> <span className='notifieddate'>{new Date(notification.date).toLocaleDateString()}</span>
                </Card.Text>
            </div>
       </div>
   </Card.Body>  
   </Card>
     ))}
    </>
  );
};

export default StdNotifications;