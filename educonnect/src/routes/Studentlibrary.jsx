import { Link } from 'react-router-dom';
import Topbar from '../Component/Topbar';
import Studnavbar from '../Component/Studnavbar';
import "../Css/Studdashcss.css";

function Studentlibrary(){
    return(
        <>
        <div className='headerrtop'>
        <Topbar/>
        </div>
        <div className='siderrr'>
        <Studnavbar/>
        </div>
        </>
    )
}
export default Studentlibrary;