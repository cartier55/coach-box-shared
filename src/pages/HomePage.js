import NextShiftNotification from "../components/HomeComponents/NextShiftNotification";
import DailyCoachVideo from "../components/HomeComponents/DailyWorkoutVid";
import WeeklyWorkoutPDFLink from "../components/HomeComponents/WeeklyPDF";
import CoachCommentsSection from "../components/HomeComponents/CommentSection";
import GymLogo from "../components/HomeComponents/GymLogo";
import logo from "../imgs/CrossFit-Surmount_logo.svg";
import { useEvents } from "../react-query/useEvents";
import { format, parse, parseISO } from "date-fns";
import { utcToZonedTime } from 'date-fns-tz';
import { useProgramming } from "../react-query/useProgramming";

const Home = () => {
    const { event:events, isLoading, isError, error } = useEvents({ fetchType: 'nextEvent' });
    const { dailyVideoLink, weeklyPDFLink } = useProgramming();

    // Transform a list of event objects to the format expected by NextShiftNotification
const transformEventsToNextShifts = (events) => {
    return events.map(event => {
        const startDate = utcToZonedTime(event.start, 'America/New_York'); // Replace with your time zone
        const date = format(startDate, 'MM/dd/yy');
        const time = format(startDate, 'h:mma');
        
        return {
            date,
            time,
        };
    });
};

    // const dekaLinkWeekdayMapping = {
    // 'Friday': 'https://youtu.be/1z1uoVM0Zh0',
    // 'Monday': 'https://youtu.be/mDgE3lEg3dk',
    // 'Saturday': 'https://youtu.be/6flv9RoWcp4',
    // 'Thursday': 'https://youtu.be/Lht6GzcY9Fw',
    // 'Tuesday': 'https://youtu.be/jgc7dLuy3dg',
    // 'Wednesday': 'https://youtu.be/HAb_G6meg7U'}

    // A function that depending on the week day returns the link to the video
    // const getVideoLink = () => {
    //     const today = new Date();
    //     const day = today.toLocaleDateString('en-US', {weekday: 'long'});
    //     return dekaLinkWeekdayMapping[day]
    // }

    // const youtubeLink = getVideoLink();
    // const pdfLink = "https://dekacomp.us4.list-manage.com/track/click?u=723a26c4b593ffbf674f2f44b&id=49034fcf0e&e=00cac42032";  // Replace with your actual PDF link

    const nextShifts = events ? transformEventsToNextShifts(events) : null;


    return ( 
        
    <div>
        {/* <h1>Home Page</h1> */}
        {/* Add the NextShiftNotification component here */}
        <GymLogo imgSrc={logo}/>
        {nextShifts ? (
        <NextShiftNotification nextShifts={nextShifts} />
        ) : (
        <NextShiftNotification loading={true} />
        )}
        {/* <NextShiftNotification nextShift={nextShift} /> */}
        {dailyVideoLink ? <DailyCoachVideo youtubeLink={dailyVideoLink}/> : <p style={{textAlign: "center", paddingTop:"35px"}}>No Workout Video Today 🥲</p>}
        {weeklyPDFLink ? <WeeklyWorkoutPDFLink pdfLink={weeklyPDFLink}/> : <p style={{textAlign: "center"}}>No Weekly PDF Today 🥲</p>}
        <CoachCommentsSection />
        {/* Rest of your HomePage code */}
    </div>
    );
}
 
export default Home;