import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryIcon from '@mui/icons-material/LocalLibrary';
import MessageIcon from '@mui/icons-material/Message';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
export const Studentlink = [
  {
    title: "Dashboard",
    url: "/studentdash",
    cName: "stddash-links",
    icon: <DashboardIcon fontSize='35px'/>,
  },
  {
    title: "Courses",
    url: "/studentcourse",
    cName: "stddash-links",
    icon: <LibraryBooksIcon fontSize='35px'/>,
  },
  {
    title: "Library",
    url: "/studentlibrary",
    cName: "stddash-links",
    icon : <LibraryIcon fontSize='35px'/>,
    
  },
  {
    title: "Messages",
    url: "/studentmessage",
    cName: "stddash-links",
    icon: <MessageIcon fontSize='35px'/>,
   
  },
  {
    title: "Calendar",
    url: "/studentcalendar",
    cName: "stddash-links",
    icon: <CalendarIcon fontSize='35px'/>,
   
  },
  {
    title: "Events",
    url: "/studentevent",
    cName: "stddash-links",
    icon: <EventAvailableIcon fontSize='35px'/>
  },
];
