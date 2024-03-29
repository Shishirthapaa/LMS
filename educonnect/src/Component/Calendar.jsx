import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Css/Calendarcss.css';

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = momentLocalizer(moment);

const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={[
        {
          title: 'My event',
          start: new Date(),
          end: new Date(),
        },
      ]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
