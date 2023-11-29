import React from 'react';
import '../../stylez/DateToolBar.css'
import { format, addMonths, subMonths } from 'date-fns';

const MonthToolBar = ({ currentDate, setCurrentDate }) => {

    const formatMonth = (date) => {
        if(!date || !(date instanceof Date)) return ''; 
        return format(date, 'MMMM yyyy');
    };

    const handleTodayClick = () => {
        setCurrentDate(new Date());
    };

    const handleBackClick = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1));
    };

    const handleNextClick = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

    return (
        <div className="cjc-toolbar" style={{marginLeft:'5px'}}>
            <span className="cjc-btn-group">
                <button type="button" onClick={handleBackClick}>Back</button>
                <button type="button" onClick={handleTodayClick}>Today</button>
                <button type="button" onClick={handleNextClick}>Next</button>
            </span>
            <span className="cjc-toolbar-label">{formatMonth(currentDate)}</span>
            <span className="cjc-btn-group"></span>
        </div>
    );
}

export default MonthToolBar;
