import React from 'react';
import { FaHourglassHalf } from 'react-icons/fa'; 
import { format } from 'date-fns';
import '../../stylez/DayWorkedCard.css'

function DayWorkedCard({ date, events }) {
  const formattedDate = format(new Date(date), 'MM/dd/yyyy');
  const hoursWorked = events.length; // Assuming each event is 1 hour
  const payPeriod = events[0].pay_period;
  
  return (
    <div className="day-worked-card">
      <FaHourglassHalf className="card-icon" />
      <div className="divider"></div>
      <div className="hours-content">
        <h3>{formattedDate}</h3>
        <p>{hoursWorked} hrs</p>
      </div>
      {/* <div className="pay-period"> */}
        {/* <span>Pay Period: {payPeriod}</span> */}
        {/* <span>{payPeriod}</span> */}
      {/* </div> */}
    </div>
  );
}

export default DayWorkedCard;
