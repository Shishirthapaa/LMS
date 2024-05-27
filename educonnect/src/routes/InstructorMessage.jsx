import Topbar from '../Component/Topbar';
import Instructornavbar from '../Component/Instructornavbar';
import "../Css/Instructormessagecss.css";
import InstMessage from '../Component/InstMessage';
function InstructorMessage(){
    return(
        <>
        <div className='instheaderrtop'>
        <Topbar/>
        </div>
        <div className='instsiderrr'>
        <Instructornavbar/>
        </div>
        <div className='instmessageall'>
            <div className='instmessagedetailsall'>
            <InstMessage/>
            </div>
           
        </div>
        </>
    )
}
export default InstructorMessage;