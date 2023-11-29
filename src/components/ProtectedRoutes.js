import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../react-query/useAuth';
import { useAdmin } from '../react-query/useAdmin';
import MobileOnlyPage from '../pages/MobileOnlyPage';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
const { verify, adminVerificationError } = useAdmin();
    const location = useLocation();
    
    const [isMobileDevice, setIsMobileDevice] = useState(isMobile()); // Track mobile device state
    const [isAdmin, setIsAdmin] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);

    // Function to determine if the user is on a mobile device based on screen width
    function isMobile() {
      return window.innerWidth <= 768; // Adjust the threshold as needed
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobileDevice(isMobile());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const verifyAdmin = async () => {
            await verify();
            setIsVerifying(false);
        };
        if (isAuthenticated) {
            verifyAdmin();
        }
    }, [isAuthenticated, verify]);

    useEffect(() => {
        if (!adminVerificationError) {
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }
        console.log(adminVerificationError)
    }, [adminVerificationError]);

    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (!isAdmin && !isMobileDevice && !isVerifying) {
        // If the user is not an admin, not on a mobile device, and verification is complete, show the MobileOnlyPage
        return <Navigate to="/desktop" state={{ from: location }} replace />;
    }

    return isVerifying ? <div>Loading...</div> : children; // Show loading while verifying admin status
};

export default ProtectedRoute;

