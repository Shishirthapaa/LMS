import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {faUserGraduate, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
export const Adminlink = [
  {
    title: "Dashboard",
    url: "/admindash",
    cName: "admdash-links",
    icon: <DashboardIcon fontSize='35px'/>,
  },
  {
    title: "Courses",
    url: "/admincourse",
    cName: "admdash-links",
    icon: <LibraryBooksIcon fontSize='35px'/>,
  },
  {
    title: "Instructors",
    url: "/admininstructor",
    cName: "admdash-links",
    icon : <FontAwesomeIcon icon={faPersonChalkboard} fontSize={35}/>,
    
  },
  {
    title: "Students",
    url: "/adminstudent",
    cName: "admdash-links",
    icon: <FontAwesomeIcon icon={faUserGraduate} fontSize={35}/>,
   
  },
  {
    title: "Calendar",
    url: "/admincalendar",
    cName: "admdash-links",
    icon: <CalendarIcon fontSize='35px'/>,
   
  },
  {
    title: "Events",
    url: "/adminevent",
    cName: "admdash-links",
    icon: <EventAvailableIcon fontSize='35px'/>,
   
  },
];
