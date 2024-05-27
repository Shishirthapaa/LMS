import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryIcon from '@mui/icons-material/LocalLibrary';
import MessageIcon from '@mui/icons-material/Message';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
export const  Instructorlink = [
  {
    title: "Dashboard",
    url: "/instructordash",
    cName: "instdash-links",
    icon: <DashboardIcon fontSize='35px'/>,
  },
  {
    title: "Courses",
    url: "/instructorcourse",
    cName: "instdash-links",
    icon: <LibraryBooksIcon fontSize='35px'/>,
  },
  {
    title: "Library",
    url: "/instructorlibrary",
    cName: "instdash-links",
    icon : <LibraryIcon fontSize='35px'/>,
    
  },
  {
    title: "Messages",
    url: "/instructormessage",
    cName: "instdash-links",
    icon: <MessageIcon fontSize='35px'/>,
   
  },
  {
    title: "Calendar",
    url: "/instructorcalendar",
    cName: "instdash-links",
    icon: <CalendarIcon fontSize='35px'/>,
   
  },
  {
    title: "Events",
    url: "/instructorevent",
    cName: "instdash-links",
    icon: <EventAvailableIcon fontSize='35px'/>
  },
];
