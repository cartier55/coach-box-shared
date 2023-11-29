import React, { useState } from 'react';
import '../../stylez/DateToolBar.css'
import { format, addDays, subDays } from 'date-fns';

const DayToolBar = ({ currentDate, setCurrentDate }) => {
    // const [currentDate, setCurrentDate] = useState(new Date());

    const formatDate = (date) => {
        // console.log(date);
        if(!date || !(date instanceof Date)) return ''; 
        return format(date, 'EEEE MMM d');
    };

    const handleTodayClick = () => {
        setCurrentDate(new Date());
    };

    const handleBackClick = () => {
        setCurrentDate(prevDate => subDays(prevDate, 1));
    };

    const handleNextClick = () => {
        setCurrentDate(prevDate => addDays(prevDate, 1));
    };

    return (
        <div className="cjc-toolbar" style={{marginLeft:'5px'}}>
            <span className="cjc-btn-group">
                <button type="button" onClick={handleBackClick}>Back</button>
                <button type="button" onClick={handleTodayClick}>Today</button>
                <button type="button" onClick={handleNextClick}>Next</button>
            </span>
            <span className="cjc-toolbar-label">{formatDate(currentDate)}</span>
            <span className="cjc-btn-group"></span>
        </div>
    );
}

export default DayToolBar;

