import React, { useEffect, useRef } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import enUS from 'date-fns/locale/en-US';
import { isAfter, isBefore, isEqual, startOfDay } from 'date-fns';
import '../../stylez/Events.css'
import DateToolBar from './DayToolBar';
import MonthToolBar from './MonthToolBar';
const locales = {
  'en-US': enUS,
};

// This function checks if a date 'current' is between 'startDate' and 'endDate'
const isBetween = (current, startDate, endDate) => {
  const date = startOfDay(current);
  const start = startOfDay(startDate);
  const end = startOfDay(endDate);
  return (isAfter(date, start) || isEqual(date, start)) && (isBefore(date, end) || isEqual(date, end));
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const formats = {
  weekdayFormat: (date, culture, localizer) =>
    localizer.format(date, 'EEEE', culture).slice(0, 1),
};





function MonthView(props) {
  const { events } = props;
  
  useEffect(() => {
    // Grab all the rbc-row-content divs
    let rowContents = document.querySelectorAll('.rbc-row-content');
    
    rowContents.forEach(rowContent => {
        let rows = rowContent.querySelectorAll('.rbc-row');
        // console.log(rows)
        if (rows.length >= 2) {
          // console.log(rows)
            // If there are more than 1 .rbc-row w/ .rbc-row-segment as a child, remove the excess ones

            for (let i = 2; i <= rows.length; i++) {
                // console.log(rows)
                // rowContent.removeChild(rows[i]);
            }
        }
    });
    }, [events]);
    
        return (
          <Calendar
          date={props.currentMonth}
          onSelectSlot={props.onSelectSlot}
          onSelectEvent={props.onSelectEvent}
          formats={formats}
          events={events}
          views={['month']}
          step={60}
          showMultiDayTimes
          localizer={localizer}
          title="My Schedule"
          components={{
            toolbar: () => <MonthToolBar currentDate={props.currentMonth} setCurrentDate={props.setSelectedDate} />,
            month: {
              dateHeader: (props) => {
                // console.log(props)
                const { date, label } = props;
                let highlightDate = events.some(event => isBetween(date, event.start, event.end));
                // console.log(props.selectedDate)
                return (
                  // <span style={highlightDate ? { color: 'red' } : null}>{label}</span>
                  <span >{label}</span>
                );
              },
              event: (props) => {
                // console.log(props)
                return (
                  <span>
                    {/* <strong>{props.event.title}</strong> */}
                    {/* {event.desc && ':  ' + event.desc} */}
                  </span>
                );
              },
        },
      }}
    />
  );
}

export default MonthView;
