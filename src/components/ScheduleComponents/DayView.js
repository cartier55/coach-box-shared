import { isSameDay } from "date-fns";
import DayToolBar from "./DayToolBar";
import EventList from "./EventList";
import { useState } from "react";


const DayView = ({ events, currentDate, setCurrentDate }) => {

  // const [currentDate, setCurrentDate] = useState(new Date());

  // Filter the events for the selected date
  const eventsForDay = events.filter(event => isSameDay(currentDate, new Date(event.start)));

  return ( 
    <div>
      {/* Error when moving from day to a day with no events causing white screen error out */}
      {/* <DayToolBar currentDate={currentDate} setCurrentDate={setCurrentDate} /> */}
      <EventList events={eventsForDay} />
    </div>
   );
}
 
export default DayView;