import Topbar from '../Component/Topbar';
import Instructornavbar from '../Component/Instructornavbar';
import Calendar from '../Component/Calendar';
import "../Css/Instructorcalendar.css";

function InstructorCalendar(){
    return(
        <>
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className='instsiderrr'>
        <Instructornavbar/>
        </div>
        <div className='instcalall'>
            <div className='instcalbox'>
            <Calendar />
            </div>
        </div>
        </>
    )
}
export default InstructorCalendar;