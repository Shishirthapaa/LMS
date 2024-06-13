import React, { useEffect, useState } from 'react';
import { Card} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InstNotifications  () {
    const { _id } = useParams();
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [notificationEditModal, setNotificationEditModal] = useState(false);
    const [notificationDeleteModal, setNotificationDeleteModal] = useState(false);
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

  const handleEditNotification = async () => {
    try {
      const response = await axios.put(`https://lms-api-cyan.vercel.app/courses/notifications/${selectedNotification._id}`, {
        notificationDescription: selectedNotification.description,
        notificationDate: selectedNotification.date, 
        notificationTeacher: selectedNotification.teacher
      });
      
      if (response.status === 200) {
        setNotificationEditModal(false);
        setSelectedNotification(null);
        fetchNotifications(_id);
        setErrors("");
      } else {
        console.error('Failed to update notification:', response.statusText);
      }
    } catch (error) {
      setErrors('Error updating notification.');
      console.error('Error updating notification:', error);
    }
    
  };
  const handleDeleteNotification = async () => {
    try {
      const response = await axios.delete(`https://lms-api-cyan.vercel.app/courses/notifications/${selectedNotification._id}`);
      
      if (response.status === 200) {
        setNotificationDeleteModal(false);
        setSelectedNotification(null);
        fetchNotifications(_id);
        setErrors("");
      } else {
        console.error('Failed to delete notification:', response.statusText);
      }
    } catch (error) {
      setErrors('Error deleting notification:');
      console.error('Error deleting notification:', error);
    } 
  };
  const handleOpennotificationEditModal = (notification) =>{
    setNotificationEditModal(true);
    setSelectedNotification(notification);
}
const handleClosenotificationEditModal = () =>{
    setNotificationEditModal(false);
    setSelectedNotification(null);
    setErrors("");
}
const handleOpennotificationDeleteModal = (notification) =>{
    setNotificationDeleteModal(true);
    setSelectedNotification(notification);
}
const handleClosenotificationDeleteModal = () =>{
    setNotificationDeleteModal(false);
    setSelectedNotification(null);
    setErrors("");

}
  return (
    <>
    {notifications && notifications.map((notification) => (
   <Card key={notification._id} style={{ minwidth: '58rem', marginBottom: '20px', width:'auto', boxShadow:'0 2px 4px 0 rgba(0,0,0,0.2)' }}>
   <Card.Body>
       <div className="row align-items-start">
           <div className="col" style={{ textAlign: 'left' }}>
               <Card.Text className="text-left">{notification.description}</Card.Text>
           </div>
           <div className='col-auto ml-auto'>
               <button className="btn btn-edit" onClick={() => handleOpennotificationEditModal(notification)}>
                   <i className="fa-solid fa-pen"></i>
               </button>
               <button className="btn btn-delete ml-2" onClick={() => handleOpennotificationDeleteModal(notification)}>
                   <i className="fa-solid fa-trash"></i>
               </button>
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


    <div className={`modal fade ${notificationEditModal ? 'show' : ''}`} id="editnotificationModal" tabIndex="-1" aria-labelledby="editnotificationModalLabel" aria-hidden="true" style={{ display: notificationEditModal ? 'block' : 'none' }}>
    <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="editFoldarModalLabel">Edit notification</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosenotificationEditModal}></button>
        </div>
        
        <div className="modal-body">
            <form>

                    <div className="mb-3">
                        <label htmlFor="notificationDescription" className="col-form-label">Notification Description:</label>
                        <textarea className="form-control" id="notificationDescription" name="notificationDescription" value={selectedNotification?.description} onChange={(e) => setSelectedNotification({ ...selectedNotification, description: e.target.value })} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="notificationDate" className="col-form-label">Notified On:</label>
                        <input type="text" className="form-control" id="notificationDate" name="notificationDate" value={selectedNotification? new Date(selectedNotification.date).toISOString().split('T')[0]:''} disabled />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="notificationTeacher" className="col-form-label">Notified By:</label>
                        <input type="text" className="form-control" id="notificationTeacher" name="notificationTeacher" value={selectedNotification?.teacher} disabled/>
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}   
                    </div> 
            </form>
        </div>
        
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClosenotificationEditModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleEditNotification} style={{backgroundColor:"#7E30E1"}}>Edit Notification</button>
        </div>
        
    </div>
    
    </div>
    
    </div>
    <div className={`modal fade ${notificationDeleteModal ? 'show' : ''}`} id="deletenotificationModal" tabIndex="-1" aria-labelledby="editnotificationModalLabel" aria-hidden="true" style={{ display: notificationDeleteModal ? 'block' : 'none' }}>
    <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
        <div className="modal-header">
            
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosenotificationDeleteModal}></button>
        </div>
        
        <div className="modal-body">
            <h1 className="modal-title fs-5" id="deletenotificationModalLabel">Delete notification</h1>
        </div>
        <div className="mb-3">
          {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClosenotificationDeleteModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleDeleteNotification} style={{backgroundColor:"#7E30E1"}}>Confirm</button>
        </div>
        
    </div>
    
    </div>
    
    </div>
    </>
  );
};

export default InstNotifications;