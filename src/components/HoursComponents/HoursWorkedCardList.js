import React from 'react';
import DayWorkedCard from './DayWorkedCard';
import { format } from 'date-fns';
import '../../stylez/HoursWorkedList.css'
function HoursWorkedCardsList({ events }) {
  

  const createDateWithoutTimeZone = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-').map(Number);
    return new Date(year, month - 1, day);
  }

// ... Inside your component

// Group events by date
const eventsByDate = {};
events.forEach(event => {
  // const eventDate = format(new Date(event.start), 'yyyy-MM-dd');
  // const eventDate = format(createDateWithoutTimeZone(event.start), 'yyyy-MM-dd');
  const date = new Date(event.start);
  const eventDate = date.toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' });
  if (!eventsByDate[eventDate]) {
      eventsByDate[eventDate] = [];
    }
    eventsByDate[eventDate].push(event);
  });

  // Sort the dates
  const sortedDates = Object.keys(eventsByDate).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  return (
    <div className="hours-worked-cards-list">
      {sortedDates.map(date => (
        <DayWorkedCard key={date} date={date} events={eventsByDate[date]} />
      ))}
    </div>
  );
}

export default HoursWorkedCardsList;
