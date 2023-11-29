import React from 'react';
import '../../stylez/EventList.css'
import { FaDumbbell } from 'react-icons/fa'; // Importing the FontAwesome dumbbell icon
import { format } from 'date-fns'; // Importing format function from date-fns

// EventCard Component
function EventCard({ event }) {
    const startDate = new Date(event.start);

    const formattedTime = format(startDate, 'hh:mm a');

    return (
        <div className="event-card">
        <FaDumbbell className="card-icon"/>
        <div className="divider"></div>
        <div className="event-content">
            <h3>{event.title}</h3>
            <p>{formattedTime}</p>
        </div>
    </div>
    );
}

export default EventCard;
