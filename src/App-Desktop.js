import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/HomePage';
import Vacations from './pages/VacationsPage';
import HoursWorked from './pages/HoursWorkedPage';
import ScheduleMaker from './pages/ScheduleMakerPage';
import Settings from './pages/SettingsPage';
import Schedule from './pages/SchedulePage';
import Sidebar from './components/HomeComponents/SideBar';
import SignInPage from './pages/SigninPage';
import ProtectedRoute from './components/ProtectedRoutes';
import { useEffect } from 'react';
import SignUpPage from './pages/SignupPage';
import UpdateDetails from './components/SettingsComponents/UpdateDetails';
import FeatureRequest from './components/SettingsComponents/FeatureReq';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  const location = useLocation();
  
  const hideSidebarForRoutes = ["/signin", "/signup"];
  const routesWithBackground = ["/signin", "/signup", "/signout"]; // Add "/signout" if it exists

  // Set the body background image based on the route
  useEffect(() => {
    if (routesWithBackground.includes(location.pathname)) {
      document.body.style.backgroundImage = "url('/coach-mobile-box.png')"; // Replace with your image path
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundAttachment = "fixed";
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [location.pathname]);


  return (
    <div className="d-flex">
      { !hideSidebarForRoutes.includes(location.pathname) && <Sidebar /> }
      <div className="flex-grow-1" style={hideSidebarForRoutes.includes(location.pathname) ? {} : {marginLeft:"55px"}}>
        <Routes>
          <Route path="/signin" element={<SignInPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/vacations" element={<ProtectedRoute><Vacations/></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
          <Route path="/update" element={<ProtectedRoute><UpdateDetails/></ProtectedRoute>} />
          <Route path="/request" element={<ProtectedRoute><FeatureRequest/></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><Schedule/></ProtectedRoute>} />
          <Route path="/hours-worked" element={<ProtectedRoute><HoursWorked/></ProtectedRoute>} />
          <Route path="/schedule-maker" element={<ProtectedRoute><ScheduleMaker/></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
