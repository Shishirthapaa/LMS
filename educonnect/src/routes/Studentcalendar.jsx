import Topbar from '../Component/Topbar';
import Studnavbar from '../Component/Studnavbar';
import Calendar from '../Component/Calendar';
import "../Css/Studentcalendar.css";

function Studentcalendar(){
    return(
        <>
        <div className='headerrtop'>
        <Topbar/>
        </div>
        <div className='siderrr'>
        <Studnavbar/>
        </div>
        <div className='stdcalall'>
            <div className='stdcalbox'>
            <Calendar />
            </div>
        </div>
        </>
    )
}
export default Studentcalendar;