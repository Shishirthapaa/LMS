import Topbar from '../Component/Topbar';
import Studnavbar from '../Component/Studnavbar';
import "../Css/Studentevent.css";
import { useEffect, useState } from 'react';

function Studentevent(){
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
        <div className='headerrtop'>
        <Topbar/>
        </div>
        <div className='siderrr'>
        <Studnavbar/>
        </div>
        <div className='stdeventall'>
            <div className='stdevent'>
                <h3 className='stdeventinfo'>Upcoming Events</h3> 
            </div>
            <div className='stdeventdetailsall'>
            {events.map((event, index)=>( 
            <div className='stdeventdetails' key={index}>
                <h3 className='stdeventtitle'>{event.eventTitle}</h3>
                <p className='stdeventdesc'> {event.eventDescription}</p>
                <p className='stdeventdate'>{formatDate(event.eventDate)}</p>
                {index < events.length - 1 && <hr className='stdeventseparator' />}

            </div>
            ))}
            </div>
        </div>
        </>
    )
}
export default Studentevent;