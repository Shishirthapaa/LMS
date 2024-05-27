import React from "react";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import { Instructorlink } from "./Instructorlink";
import '../Css/Instructornavbar.css';

class Instructornavbar extends Component{
    state = {clicked:false};
    handleClickk =()=>{
        this.setState({clicked:!this.state.clicked});    
    };
    render(){
        return(
            <nav className="Instructorsidebar"> 
                <div className='instnav_menu'>
                        {Instructorlink.map((item, index) => ( 
                                <NavLink to={item.url} key={index} className="instlinks">
                                    <div className="instsideicon">{item.icon}</div>
                                    <div className="instsidetext">{item.title}</div>
                                </NavLink>
                        ))}
          
         </div>
         </nav>
        );
    }
}
export default Instructornavbar;