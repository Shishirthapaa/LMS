import React from "react";
import { NavLink, useParams } from "react-router-dom";
import '../Css/Instcrsnavbar.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function InstructorCourseNavbar(){

    const {_id} = useParams();


    return(
        <div className="instcrsnavbar">
            <NavLink to="/instructorcourse" className="instcrsnavback" >
                <ArrowBackIosIcon/>
                <h5>Back</h5>
            </NavLink>
            {_id && (
                <>
                    <NavLink to={`/instructorcoursedash/${_id}/contents`} className="instcrsnavcontent">
                        <h5>Contents</h5>
                    </NavLink>
                    <NavLink to={`/instructorcoursedash/${_id}/assignments`} className="instcrsnavassign">                            
                        <h5>Assignment</h5>
                    </NavLink>
                    <NavLink to={`/instructorcoursedash/${_id}/grades`} className="instcrsnavgrade">
                        <h5>Grades</h5>
                    </NavLink>
                    <NavLink to={`/instructorcoursedash/${_id}/students`} className="instcrsnavstudent">
                        <h5>Students</h5>
                    </NavLink>
                    <NavLink to={`/instructorcoursedash/${_id}/notifications`} className="instcrsnavnotify">
                        <h5>Notifications</h5>
                    </NavLink>
                </>
            )}
            
        </div>
        
    );
}
export default InstructorCourseNavbar;