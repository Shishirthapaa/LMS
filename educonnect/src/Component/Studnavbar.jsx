import React from "react";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import { Studentlink } from "./Studentlink";
import '../Css/Studnavbarcss.css';

class Studnavbar extends Component{
    state = {clicked:false};
    handleClickk =()=>{
        this.setState({clicked:!this.state.clicked});    
    };
    render(){
        return(
            <>
            <nav className="Studentsidebar"> 
                <div className='stdnav_menu'>
                        {Studentlink.map((item, index) => ( 
                                <NavLink to={item.url} key={index} className="stdlinks">
                                    <div className="stdsideicon">{item.icon}</div>
                                    <div className="stdsidetext">{item.title}</div>
                                </NavLink>
                        ))}
          
         </div>
         </nav>
         </>
        );
    }
}
export default Studnavbar;