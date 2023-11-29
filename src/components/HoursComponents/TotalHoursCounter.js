import React from 'react';
import '../../stylez/TotalHoursCounter.css';  // Import the CSS (You will have to create this file)

const TotalHoursCounter = ({ events }) => {
    let totalHours = 0;

    if (events) {
        // Assuming each event represents 1 hour worked
        totalHours = events.length;
    }

    return (
        <div className="total-hours-counter">
            <h2>Total Hours: {totalHours}</h2>
        </div>
    );
};

export default TotalHoursCounter;
