import React, {useEffect, useState} from "react";
import Topbar from "../Component/Topbar";
import Adminnavbar from "../Component/Adminnavbar";
import "../Css/Admineventcss.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function AdminEvent(){
    const [events, setEvents] = useState([]);
    const [eventModal, seteventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventEditModal, seteventEditModal] = useState(false);
    const [eventDeleteModal, seteventDeleteModal] = useState(false);

    const [newEvent, setNewEvent] = useState({
        eventId: "",
        eventTitle: "",
        eventDescription: "",
        eventDate: ""
    });
    const [errors, setError] = useState("");

    useEffect(() =>{
    fetchEvents();
},[]);
const fetchEvents = async () => {
    try {
        const response = await fetch('http://localhost:3001/events/addevents');
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
    } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events. Please try again.');
    }
};



    const handleOpeneventModal = () =>{
        seteventModal(true);

    }
    const handleCloseeventModal = () => {
        seteventModal(false);

    }

    const handleOpeneventEditModal = (event) =>{
        seteventEditModal(true);
        setSelectedEvent(event);
        setNewEvent({
            eventId: event.eventId,
            eventTitle: event.eventTitle,
            eventDescription: event.eventDescription,
            eventDate: event.eventDate
        });
    }
    const handleCloseeventEditModal = () =>{
        seteventEditModal(false);
        setSelectedEvent(null);
    }
    const handleOpeneventDeleteModal = (event) =>{
        seteventDeleteModal(true);
        setSelectedEvent(event);
    }
    const handleCloseeventDeleteModal = () =>{
        seteventDeleteModal(false);
        setSelectedEvent(null);

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleAddEvent = async () => {
        if (!newEvent.eventId || !newEvent.eventTitle || !newEvent.eventDescription || !newEvent.eventDate){
            setError("Please fill in all fields.");
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/events/addevents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            if (!response.ok) {
                throw new Error('Failed to add course');
            }
                const data = await response.json();
                setEvents([...events, data]);
                setNewEvent({
                    eventId: "",
                    eventTitle: "",
                    eventDescription: "",
                    eventDate: ""
                });
                setError("");
                handleCloseeventModal();
            
        } catch (error) {
            setError('Failed to add Course! Course already exists.');
            console.error('Error adding course:', error);
        }
    }
    const handleEditEvent = async () => {
        try {console.log('Selected event:', selectedEvent);

            if (!selectedEvent || !selectedEvent._id) {
                setError('No event selected for editing');
                return;
            }
          const { eventId, eventTitle, eventDescription, eventDate } = newEvent;
          const eventData = { eventId, eventTitle, eventDescription, eventDate };
          if (!selectedEvent._id) {
            setError('Selected event does not have a valid ID');
            return;
        } 
          const response = await fetch(`http://localhost:3001/events/editevents/${selectedEvent._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
          });
          if (!response.ok) {
            throw new Error('Failed to edit course');
          }
          const updatedEvent = await response.json();
          const updatedEvents = events.map(event => event._id === updatedEvent._id ? updatedEvent : event);
          setEvents(updatedEvents);
          setSelectedEvent(null);
          setNewEvent({
            eventId: "",
            eventTitle: "",
            eventDescription: "",
            eventDate: ""
          });
          seteventEditModal(false);
          setError("");
        } catch (error) {
          setError('Failed to edit course. Please try again.');
          console.error('Error editing course:', error);
        }
      };
    
      const handleDeleteEvent = async () => {
        try {
          const response = await fetch(`http://localhost:3001/events/deleteevents/${selectedEvent._id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete event');
          }
          const deletedEventId = selectedEvent._id;
          const updatedEvents = events.filter(event => event._id !== deletedEventId);
          setEvents(updatedEvents);
          setSelectedEvent(null);
          seteventDeleteModal(false);
        } catch (error) {
          console.error('Error deleting course:', error);
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
    <div className='admeventall'>
            <div className='admeventinfo'>
                <h3 className='eventinfoo'>Event-Info</h3> 
            </div>
    <button id="addeventbtn" type='button' onClick={handleOpeneventModal}>Add Event</button> 

    <div className="container" style={{ width: '81.6%', margin:'1.5%' }}>
                <div className="row">
                    <div className="col-md-12 offset-custom mb-3 ">
                    <div className="card" style={{boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.10)'}}>
                        <div className="card-body">
                        <div className="row font-weight-bold" style={{ backgroundColor: '#383A3F', color: 'white', padding: '10px 0' }}>
                            <div className="col">Event ID</div>
                            <div className="col">Event Title</div>
                            <div className="col">Event Date</div>
                            <div className="col">Actions</div>
                        </div>
                        {events.map(event => (
                        <div className="row" key={event._id}>
                            <div className="col">{event.eventId}</div>
                            <div className="col">{event.eventTitle}</div>
                            <div className="col">{event.eventDate}</div>
                            <div className="col">
                            <button className="btn btn-edit mr-2" onClick={() => handleOpeneventEditModal(event)}>
                            <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn btn-delete" onClick={() => handleOpeneventDeleteModal(event)}>
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
            <div className={`modal fade ${eventModal ? 'show' : ''}`} id="addEventModal" tabIndex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true" style={{ display: eventModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="addEventModalLabel">Add New Event</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseeventModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="eventId" className="col-form-label">Event ID:</label>
                        <input type="text" className="form-control" id="eventId" name="eventId" value={newEvent.eventId} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eventTitle" className="col-form-label">Event Title:</label>
                        <input type="text" className="form-control" id="eventTitle" name="eventTitle" value={newEvent.eventTitle} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eventDescription" className="col-form-label">Event Description:</label>
                        <textarea className="form-control" id="eventDescription" name="eventDescription" value={newEvent.eventDescription} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eventDate" className="col-form-label">Event Date:</label>
                        <input type="date" className="form-control" id="eventDate" name="eventDate" value={newEvent.eventDuration} onChange={handleInputChange} required />
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}                 </div>
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseeventModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleAddEvent} style={{backgroundColor:"#7E30E1"}}>Add Event</button>
            </div>
            
        </div>
        
    </div>
    
</div>

<div className={`modal fade ${eventEditModal ? 'show' : ''}`} id="editEventModal" tabIndex="-1" aria-labelledby="editEventModalLabel" aria-hidden="true" style={{ display: eventEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="editEventModalLabel">Edit Event</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseeventEditModal}></button>
            </div>
            
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="eventId" className="col-form-label">Event ID:</label>
                        <input type="text" className="form-control" id="eventId" name="eventId" value={newEvent.eventId} onChange={handleInputChange} required disabled/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eventTitle" className="col-form-label">Event Title:</label>
                        <input type="text" className="form-control" id="eventTitle" name="eventTitle" value={newEvent.eventTitle} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eventDescription" className="col-form-label">Event Description:</label>
                        <textarea className="form-control" id="eventDescription" name="eventDescription" value={newEvent.eventDescription} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eventDate" className="col-form-label">Event Date:</label>
                        <input type="date" className="form-control" id="eventDate" name="eventDate" value={newEvent.eventDuration} onChange={handleInputChange} required />
                        {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}                 </div>
                </form>
            </div>
            
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseeventEditModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleEditEvent} style={{backgroundColor:"#7E30E1"}}>Edit Course</button>
            </div>
            
        </div>
        
    </div>
    
</div>
<div className={`modal fade ${eventDeleteModal ? 'show' : ''}`} id="deleteEventModal" tabIndex="-1" aria-labelledby="editEventModalLabel" aria-hidden="true" style={{ display: eventDeleteModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseeventDeleteModal}></button>
            </div>
            
            <div className="modal-body">
                <h1 className="modal-title fs-5" id="deleteEventModalLabel">Delete Event</h1>
            </div>
            {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}  
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseeventDeleteModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleDeleteEvent} style={{backgroundColor:"#7E30E1"}}>Confirm</button>
            </div>
            
        </div>
        
    </div>
    
</div>

    </>
    )
}
export default AdminEvent;