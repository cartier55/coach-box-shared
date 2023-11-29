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
import { useEffect, useState } from 'react';
import SignUpPage from './pages/SignupPage';
import UpdateDetails from './components/SettingsComponents/UpdateDetails';
import FeatureRequest from './components/SettingsComponents/FeatureReq';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NewSideBar from './components/HomeComponents/NewSideBar';
import AdminSidebar from './components/AdminComponents/AdminSidebar';
import AdminPage from './pages/AdminPage';
import UsersPage from './pages/UsersPage';
import UserRequestsPage from './pages/UserRequestsPage';
import MobileOnlyPage from './pages/MobileOnlyPage';

function Layout() {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin');

  const hideSidebarForRoutes = ["/signin", "/signup", "/desktop"];
  const routesWithBackground = ["/signin", "/signup", "/signout"]; // Add "/signout" if it exists

  const [isMobileDevice, setIsMobileDevice] = useState(isMobile()); // Track mobile device state

    // Function to determine if the user is on a mobile device based on screen width
    function isMobile() {
      return window.innerWidth <= 768; // Adjust the threshold as needed
    }

      // Update the mobile device state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(isMobile());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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



  // const toastOptions = {
  //   toastStyle: {
  //     width: '75%', // Adjust the width as needed
  //     marginLeft: 'auto',
  //     marginRight: 'auto',
  //   },
  // };
  
  // toast.configure(toastOptions);

  return (
    <div className={`d-flex ${isMobileDevice ? 'mobile' : 'desktop'}`}>
      {/* Always show sidebar except for specific routes */}
    {!hideSidebarForRoutes.includes(location.pathname) && (
        isAdminRoute ? <AdminSidebar /> : <NewSideBar />
      )}
      <div className="flex-grow-1" style={hideSidebarForRoutes.includes(location.pathname) ? {} : {marginLeft:"55px"}}>
        {isMobileDevice || isAdminRoute || routesWithBackground ? (
          <Routes>
              <Route path="/signin" element={<SignInPage/>} />
              <Route path="/signup" element={<SignUpPage/>} />
<Route path="/desktop" element={<MobileOnlyPage/>} />
              <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
              <Route path="/vacations" element={<ProtectedRoute><Vacations/></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
              <Route path="/update" element={<ProtectedRoute><UpdateDetails/></ProtectedRoute>} />
              <Route path="/request" element={<ProtectedRoute><FeatureRequest/></ProtectedRoute>} />
              <Route path="/schedule" element={<ProtectedRoute><Schedule/></ProtectedRoute>} />
              <Route path="/hours-worked" element={<ProtectedRoute><HoursWorked/></ProtectedRoute>} />
              <Route path="/schedule-maker" element={<ProtectedRoute><ScheduleMaker/></ProtectedRoute>} />
              <Route path="/admin/panel" element={<ProtectedRoute><AdminPage/></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><UsersPage/></ProtectedRoute>} />
              <Route path="/admin/requests" element={<ProtectedRoute><UserRequestsPage/></ProtectedRoute>} />
            </Routes>
        ) : (
          <div className="desktop-message">
            <p>This is a mobile-only app.</p>
          </div>
        )}

      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
      <ToastContainer position="top-right" autoClose={5000} style={{width:'75%', marginLeft:"auto"}}/>
    </Router>
  );
}

export default App;
