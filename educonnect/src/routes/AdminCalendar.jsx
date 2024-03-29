import React, {useEffect, useState} from 'react';
import Topbar from '../Component/Topbar';
import Adminnavbar from '../Component/Adminnavbar';
import Calendar from '../Component/Calendar';
import '../Css/Admincalendar.css';

const AdminCalendar =()=> {
    return(
        <>
        <div className='admintopp'>
        <Topbar/>
        </div>
        <div className='adminsidee'>
        <Adminnavbar/>
        </div>
        <div className='admcalall'>
            <div className='admcalbox'>
            <Calendar />
            </div>
        </div>
        </>


    )



}
export default AdminCalendar;