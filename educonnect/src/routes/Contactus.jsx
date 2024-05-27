import React from 'react';
import Navbar from "../Component/Navbar";
import Aboutuscomp from '../Component/Aboutuscomp';

const  Contactus=()=>{
    return( 
        <>

        <Navbar/>
        <Aboutuscomp scrollToContact={true}/>
        </>
    )
}
export default Contactus;