import React, {useEffect, useState} from "react";
import Topbar from "../Component/Topbar";
import Adminnavbar from "../Component/Adminnavbar";
import "../Css/Admineventcss.css";

function AdminEvent(){


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
                <h2 className='eventinfoo'>Event-Info</h2> 
            </div>
    </div>
    <button id="addeventbtn" type='button'>Add Event</button> 

    </>
    )
}
export default AdminEvent;