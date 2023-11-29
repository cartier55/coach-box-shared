import React from 'react';
import '../../stylez/EventList.css'
import EventCard from './EventCard';

// EventList Component
function EventList({ events }) {
    // console.log(events);
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}

export default EventList;
