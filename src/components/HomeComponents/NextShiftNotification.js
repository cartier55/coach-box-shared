import React, { useState } from 'react';
import { BiDumbbell } from 'react-icons/bi'; 
import '../../stylez/NxtShift.css';

const NextShiftNotification = ({ nextShifts, loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to render dropdown items
  const renderDropdownItems = () => {
    if (loading) return <p>Loading...</p>;

    return nextShifts.slice(1, 3).map((shift, index) => (
      <p key={index}>{shift.date}, {shift.time}</p>
    ));
  };

  // Determine the display text based on the nextShifts array
  const displayText = (nextShifts !== undefined && nextShifts.length > 0) ? "Next Shifts" : "No Next Shift";

  return (
    <div className='shift-notification-container'>
      <div className="next-shift-notification" onClick={() => setIsOpen(!isOpen)}>
        <p>{displayText}</p>  {/* Changed this line */}
        {!loading && nextShifts.length > 0 && (
          <span className="next-shift-text">
            {nextShifts[0].date}, {nextShifts[0].time}
          </span>
        )}
        <div className={`dropdown ${isOpen ? 'open' : ''}`}>
          {renderDropdownItems()}
        </div>
      </div>
    </div>
  );
};

export default NextShiftNotification;
