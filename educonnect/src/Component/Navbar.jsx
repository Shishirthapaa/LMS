import React from 'react';
import logo from '../Images/logooz.png'
import {Link} from 'react-router-dom';
import '../Css/NavStyle.css';
import {Component} from 'react';
import { MenuItems } from './MenuItems';

class Navbar extends Component{
    state = {clicked:false};
    handleClick =()=>{
        this.setState({clicked:!this.state.clicked})    /* defining a function named handleClick*/
    }
    render(){
        return(
            <nav className="NavbarItemss"> 
                <img src={logo} alt="logo" className="logooa"/>
                <div className='menu-icons' onClick={this.handleClick}> {/* a div when clicked run the handleClick function */}
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <div className='nav_menu'>
                <ul className={this.state.clicked ? "nav-menu active":"nav-menu"}> {/* when clicked navigates to the page acoordingly */} 
                    {MenuItems.map((item, index)=>{
                        return(
                            <li key={index}>
                             <Link className={item.cName} to={item.url}>{item.title}</Link> {/* Linking the nav bar contents to their respective page */}
                            </li>
                     )
                    })}
                    <Link to="/login">
                         <button className='logbut'>Login / Sign Up</button> {/* Linking login page when button is clicked */}
                    </Link>
                </ul>
                </div>
            </nav>
      
    );
}
}
export default Navbar;