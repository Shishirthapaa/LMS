import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import Toplogo from "../Images/logooz.png";
import '../Css/Topbar.css';
const Topbar = () =>{

        return(
            <nav className="Topbarr"> 
                <div className='topleftside'>
                    <img src= {Toplogo} alt="logo" className="topbarlogo"/>
                </div>
                <div className='toprightside'>
                    <i class="fa-solid fa-bell"></i>
                    <i class="fa-solid fa-message"></i>
                    <i class="fa-solid fa-gear"></i>
                    <i class="fa-solid fa-circle-user"></i>
                </div>
            </nav>
        );
    }

export default Topbar;