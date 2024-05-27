import Topbar from '../Component/Topbar';
import Studnavbar from '../Component/Studnavbar';
import "../Css/Studentmessagecss.css";
import StdMessage from '../Component/StdMessage';

function Studentmessage(){
    return(
        <>
        <div className='headerrtop'>
        <Topbar/>
        </div>
        <div className='siderrr'>
        <Studnavbar/>
        </div>
        <div className='stdmessageall'>
            <div className='stdmessagedetailsall'>
            <StdMessage/>
            </div>
           
        </div>
        </>
    )
}
export default Studentmessage;