import React from 'react';
import"../Css/HomeStyle.css";
import bcg from '../Images/bcgz.png';
import { Link } from 'react-router-dom';
const  Homerest=()=>{
    return(
        <>
        <div className='homeall'>
            <div className='homeleftall'>
                <div className='homeleft'>
                    <h1 className='h1a'>Smart learning,</h1>
                    <h1 className='h1b'>Seamless Experience.</h1>
                    <h3 className='h3a'>Step into a world of innovation</h3>
                    <h3 className='h3b'>and seamless learning.</h3>
                </div>
            <Link to="/login">
                <button className='startbut'>Start!</button>
            </Link>
            </div>
            <div className='homeright'>
            <img alt='bcg' src={bcg}/>
            </div>
        </div>
        </>
    )
}
export default Homerest;