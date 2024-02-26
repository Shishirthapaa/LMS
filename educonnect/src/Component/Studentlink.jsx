import DashboardIcon from '@mui/icons-material/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import LibraryIcon from '@mui/icons-material/LocalLibrary';
import MessageIcon from '@mui/icons-material/Message';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
export const Studentlink = [
  {
    title: "Dashboard",
    url: "/studentdash",
    cName: "stddash-links",
    icon: <DashboardIcon />,
  },
  {
    title: "Courses",
    url: "/studentcourses",
    cName: "stddash-links",
    icon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    title: "Library",
    url: "/studentlibrary",
    cName: "stddash-links",
    icon : <LibraryIcon/>,
    
  },
  {
    title: "Messages",
    url: "/studentmessages",
    cName: "stddash-links",
    icon: <MessageIcon/>,
   
  },
  {
    title: "Calendar",
    url: "/studentcalendar",
    cName: "stddash-links",
    icon: <CalendarIcon/>,
   
  },
  {
    title: "Events",
    url: "/studentevents",
    cName: "stddash-links",
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
   
  },
];
