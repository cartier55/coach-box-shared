import React from 'react';
import '../../stylez/DateToolBar.css';
import { format, addDays, subDays, differenceInDays } from 'date-fns';

const BiWeeklyToolBar = ({ currentDate, setCurrentDate, startDate, endDate }) => {
    
    

    const handleTodayClick = () => {
        setCurrentDate(new Date());
    };

    const handleBackClick = () => {
        setCurrentDate(prevDate => subDays(prevDate, 14));
    };

    const handleNextClick = () => {
        setCurrentDate(prevDate => addDays(prevDate, 14));
    };

    return (
        <div className="cjc-toolbar" style={{marginLeft:'5px'}}>
            <span className="cjc-btn-group">
                <button type="button" onClick={handleBackClick}>Prev</button>
                <button type="button" onClick={handleTodayClick}>Current</button>
                <button type="button" onClick={handleNextClick}>Next</button>
            </span>
            <span className="cjc-toolbar-label">{`${startDate} - ${endDate}`}</span>
            <span className="cjc-btn-group"></span>
        </div>
    );
}

export default BiWeeklyToolBar;
