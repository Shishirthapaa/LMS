import React from "react";
import { Link } from "react-router-dom";
import Toplogo from "../Images/logooz.png";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import '../Css/Topbar.css';
const Topbar = () =>{

        return(
            <nav className="Topbarr"> 
                <div className='topleftside'>
                    <img src= {Toplogo} alt="logo" className="topbarlogo"/>
                </div>
                <div className='toprightside'>
                    <NotificationsNoneIcon fontSize="40px"/>
                    <ChatBubbleOutlineIcon fontSize="40px"/>
                    <SettingsIcon fontSize="40px"/>
                    <AccountCircleIcon fontSize="40px"/>
                    
                </div>
            </nav>
        );
    }

export default Topbar;