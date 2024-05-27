import React from "react";
import { NavLink, useParams } from "react-router-dom";
import '../Css/Stdcrsnavbar.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function StudentCourseNavbar(){

    const {_id} = useParams();


    return(
        <div className="stdcrsnavbar">
            <NavLink to="/studentcourse" className="stdcrsnavback">
                <ArrowBackIosIcon/>
                <h5>Back</h5>
            </NavLink>
            {_id && (
                <>
                    <NavLink to={`/studentcoursedash/${_id}/contents`} className="stdcrsnavcontent">
                        <h5>Contents</h5>
                    </NavLink>
                    <NavLink to={`/studentcoursedash/${_id}/assignments`} className="stdcrsnavassign">                            
                        <h5>Assignment</h5>
                    </NavLink>
                    <NavLink to={`/studentcoursedash/${_id}/grades`} className="stdcrsnavgrade">
                        <h5>Grades</h5>
                    </NavLink>
                    <NavLink to={`/studentcoursedash/${_id}/notifications`} className="stdcrsnavnotify">
                        <h5>Notifications</h5>
                    </NavLink>
                </>
            )}
            
        </div>
        
    );
}
export default StudentCourseNavbar;