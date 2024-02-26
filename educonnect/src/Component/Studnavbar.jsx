import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import { Studentlink } from "./Studentlink";
import '../Css/Studnavbarcss.css';

class Studnavbar extends Component{
    state = {clickedItem: null};

    handleClickk =(index)=>{
        this.setState({clickedItem: index});    
    };
    render(){
        return(
            <nav className="Studentsidebar"> 
                <div className='stdnav_menus'>
                    <ul className="stdnav-menu">
                        {Studentlink.map((item, index) => (
                        <li key={index}>
                        <Link
                            className={`${item.cName} ${this.state.clickedItem === index ? "clicked" : "" }`}to={item.url}
                            onClick={() => this.handleClickk(index)}>
                            <div className="stdsideicon">{item.icon}</div>
                            <div className="stdsidetext">{item.title}</div>
                        </Link>
              </li>
            ))}
          </ul>
         </div>
         </nav>
        );
    }
}
export default Studnavbar;