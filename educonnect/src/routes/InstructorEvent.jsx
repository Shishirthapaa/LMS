import Topbar from '../Component/Topbar';
import Instructornavbar from '../Component/Instructornavbar';
import "../Css/Instructorevent.css";
import { useEffect, useState } from 'react';

function InstructorEvent(){
    const[events, setEvents]= useState([]);

    useEffect(() =>{
        fetchEvents();
    },[]);

    const fetchEvents = async()=>{
        try{
            const response = await fetch('http://localhost:3001/events/addevents');
            if(!response.ok){
                throw new Error('Failed to fetch events.')
            }
            const data = await response.json();
            setEvents(data);
        } catch(error){
            console.error('Error fetching events.', error);
        }

    };
    const formatDate = (dateString) =>{
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    return(
        <>
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className='instsiderrr'>
        <Instructornavbar/>
        </div>
        <div className='insteventall'>
            <div className='instevent'>
                <h3 className='insteventinfo'>Upcoming Events</h3> 
            </div>
            <div className='insteventdetailsall'>
            {events.map((event, index)=>( 
            <div className='insteventdetails' key={index}>
                <h3 className='insteventtitle'>{event.eventTitle}</h3>
                <p className='insteventdesc'> {event.eventDescription}</p>
                <p className='insteventdate'>{formatDate(event.eventDate)}</p>
                {index < events.length - 1 && <hr className='insteventseparator' />}

            </div>
            ))}
            </div>
        </div>
        </>
    )
}
export default InstructorEvent;