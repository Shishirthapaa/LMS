import React from "react";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import { Adminlink } from "./Adminlink";
import '../Css/Adminnavbarcss.css';

class Adminnavbar extends Component{
    state = {clicked:false};
    handleClickk =()=>{
        this.setState({clicked:!this.state.clicked});    
    };
    render(){
        return(
            <nav className="Adminsidebar"> 
                <div className='admnav_menu'>
                        {Adminlink.map((item, index) => ( 
                                <NavLink to={item.url} key={index} className="admlinks"
                                    activeClassName="active">
                                    <div className="admsideicon">{item.icon}</div>
                                    <div className="admsidetext">{item.title}</div>
                                </NavLink>
                        ))}
          
         </div>
         </nav>
        );
    }
}
export default Adminnavbar;