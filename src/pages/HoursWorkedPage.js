import { useEffect, useState } from "react";
import BiWeeklyToolBar from "../components/HoursComponents/BiWeeklyToolBar";
import HoursWorkedCardsList from "../components/HoursComponents/HoursWorkedCardList";
import { useEvents } from "../react-query/useEvents";
import { addDays, differenceInDays, format } from "date-fns";
import TotalHoursCounter from "../components/HoursComponents/TotalHoursCounter";

const HoursWorked = () => {
    const [currentDate, setCurrentDate] = useState(new Date()); // Set the initial date to today
    const [startDate, setStartDate] = useState(null); // Set the initial date to today
    const [endDate, setEndDate] = useState(null); // Set the initial date to today
    const { events, isLoading, isError, error } = useEvents({ startDate: startDate, endDate: endDate, fetchType: 'biweekly' });
    
    // An arbitrary "epoch" start date
    const epochStartDate = new Date(2022, 9, 17); // Remember, months are 0-indexed in JavaScript Date objects
    
    const formatWeek = (date) => {
        if (!date || !(date instanceof Date)) return ''; 
        
        // Calculate days since epoch
        const daysSinceEpoch = differenceInDays(date, epochStartDate);
        
        // Calculate the current two-week period's start date
        const currentPeriodStart = addDays(epochStartDate, Math.floor(daysSinceEpoch / 14) * 14);
        const currentPeriodEnd = addDays(currentPeriodStart, 13);
        
        return {startDate:format(currentPeriodStart, 'MM/dd/yyyy'), endDate:format(currentPeriodEnd, 'MM/dd/yyyy')}
        // return `${format(currentPeriodStart, 'MM/dd/yyyy')} - ${format(currentPeriodEnd, 'MM/dd/yyyy')}`;
    };

    useEffect(() => {
        const {startDate, endDate} = formatWeek(currentDate);
        setStartDate(startDate);
        setEndDate(endDate);
    }
    , [currentDate]);

    return ( 
    <div>
        <h1 style={{textAlign:"center"}}>Scheduled Hours</h1>
        <BiWeeklyToolBar currentDate={currentDate} setCurrentDate={setCurrentDate} startDate={startDate} endDate={endDate} />
        <TotalHoursCounter events={events} />
        <HoursWorkedCardsList events={events} />
    </div>
     );
}
 
export default HoursWorked;