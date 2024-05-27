import React from 'react';
import logo from '../Images/logooz.png'
import {Link} from 'react-router-dom';
import '../Css/NavStyle.css';
import {Component} from 'react';
import { MenuItems } from './MenuItems';
import { NavLink } from 'react-router-dom';

class Navbar extends Component{
    state = {clicked:false};
    handleClick =()=>{
        this.setState({clicked:!this.state.clicked})    
    }
    render(){
        return(
            <nav className="NavbarItemss"> 
                <img src={logo} alt="logo" className="logooa"/>
                <div className='menu-icons' onClick={this.handleClick}> 
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <div className='nav_menu'>
                <ul className={this.state.clicked ? "nav-menu activee":"nav-menu"}>  
                    {MenuItems.map((item, index)=>{
                        return(
                            <li key={index}>
                             <NavLink className={item.cName} to={item.url}>{item.title}</NavLink> 
                            </li>
                     )
                    })}
                    <Link to="/login">
                         <button className='logbut'>Login / Sign Up</button>
                    </Link>
                </ul>
                </div>
            </nav>
      
    );
}
}
export default Navbar;