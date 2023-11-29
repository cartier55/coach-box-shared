import { useEffect, useState } from "react";
import DayView from "../components/ScheduleComponents/DayView";
import MonthView from "../components/ScheduleComponents/MonthView";
import { isSameDay, parseISO } from "date-fns";
import { setHours, setMinutes, setSeconds, subMilliseconds } from 'date-fns';
import Test from "../components/Test";
import DateToolBar from "../components/ScheduleComponents/DayToolBar";
import EventList from "../components/ScheduleComponents/EventList";
import { useEvents } from "../react-query/useEvents";

const Schedule = () => {

  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  
  const today = new Date();
  // console.log(currentMonth)
  const { events, error, isLoading } = useEvents({ month: currentMonth.getMonth() + 1, year: currentMonth.getFullYear(), fetchType: 'monthly' });

  // console.log(data)
  
    console.log(currentMonth.getMonth() + 1)

    events ? console.log(events) : console.log('no events')

    // Pre-format the 'start' and 'end' fields to be Date objects
    const formattedEvents = events ? events.map(event => ({
      ...event,
      start: parseISO(event.start),
      end: parseISO(event.end)
    })) : [];

    const todaysEvents = formattedEvents.filter(event => isSameDay(event.start, selectedDate));

    function getElementIndex(element) {
      const parent = element.parentNode;
      const children = Array.from(parent.children);
      return children.indexOf(element);
    }

    const updateSelectedDayStyle = (date) => {
      let index;
      // console.log(typeof date)
      const currentElement = document.querySelector('div.rbc-row div.rbc-date-cell.rbc-now');
      // console.log('Current Element:', currentElement); // Log the currentElement to see if it's correctly selected
    
      if (currentElement) {
        index = getElementIndex(currentElement);
        // console.log('Index:', index); // Log the index
    
        if (index >= 0 && currentElement.parentNode && currentElement.parentNode.nextSibling) {
          console.log('Next Sibling Children:', currentElement.parentNode.nextSibling.children); // Log to check the children of the next sibling
          const siblingChild = currentElement.parentNode.nextSibling.children[index];
          if (siblingChild && siblingChild.children[0]) {
            siblingChild.children[0].classList.remove('rbc-selected');
          }
        }
        currentElement.classList.remove('rbc-now');
      }
    
      let eventDate;
      if (isNaN(date)) {
        eventDate = new Date(Date.parse(date));
      } else {
        eventDate = new Date(date);
      }
    
      let dayNumber = eventDate.getDate().toString();
      if (dayNumber.length === 1) {
        dayNumber = '0' + dayNumber;
      }
    
      const dateCells = document.querySelectorAll('div.rbc-row div.rbc-date-cell:not(.rbc-off-range)');
      // console.log('Date Cells:', dateCells); // Log the NodeList of date cells
    
      dateCells.forEach(cell => {
        const spanElement = cell.querySelector('span');
        // console.log('Span Element:', spanElement); // Log each span element to check if it's correctly selected
    
        if (spanElement && spanElement.textContent === dayNumber) {
          cell.classList.add('rbc-now');
          index = getElementIndex(cell);
          if (index >= 0 && cell.parentNode && cell.parentNode.nextSibling) {
            const siblingChild = cell.parentNode.nextSibling.children[index];
            if (siblingChild && siblingChild.children[0]) {
              siblingChild.children[0].classList.add('rbc-selected');
            }
          }
        }
      });
    
      setSelectedDate(date);
    };
  
    useEffect(() => {
      // console.log("Selected Date:", selectedDate);
      updateSelectedDayStyle(selectedDate);
      if (selectedDate.getMonth() !== currentMonth.getMonth()) {
        setCurrentMonth(selectedDate);
    }
    }, [selectedDate]);
    
    if (isLoading) return 'Loading...';
    if (error) return `An error occurred: ${error.message}`;

    return (
        <div style={{height:'50%'}}>
            <MonthView
                currentMonth={currentMonth}
                setSelectedDate={setSelectedDate}
                events={formattedEvents} 
                onSelectSlot={slotInfo => {
                    setSelectedDate(slotInfo.start);
                }}
                onSelectEvent={(event) => updateSelectedDayStyle(event.start)}
            />
            <DayView events={todaysEvents} currentDate={selectedDate} setCurrentDate={setSelectedDate} />
            {/* <DateToolBar/>
            <EventList events={todaysEvents} /> */}
        </div>
    );
}
 
export default Schedule;
