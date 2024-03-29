import { Link } from 'react-router-dom';
import Topbar from '../Component/Topbar';
import Studnavbar from '../Component/Studnavbar';
import "../Css/Studdashcss.css"

function Studentdash(){
    return(
        <>
        <div className='headerrtop'>
        <Topbar/>
        </div>
        <div className='siderrr'>
        <Studnavbar/>
        </div>
        <div className='allstdcard'>
            <div className='studleftcard'>
                    <div className='lefttopcard'>
                        <h3 id='welstddash'> Welcome back,</h3>
                        <h3 id='stdname'> Shishir Thapa</h3>
                    </div>
                    <div className='leftbottomcard'>
                        <div className='bottomleftcard'>
                            <h3 id='welstddash'>Notice</h3>
                        </div>
                        <div className='bottomrightcard'>
                            <h3 id='welstddash'>Upcoming Assignments</h3>
                            
                        </div>
                    </div>

            </div>
            <div className='studrightcard'>
                <div className='righttop'>
                    <h3 id='welstddash'>Upcoming Events</h3>
                </div>
                <div className='rightbottom'>
                    <h3 id='welstddash'>calendar</h3>

                </div>

            </div>
        </div>
        </>
    )
}
export default Studentdash;