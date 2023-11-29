import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import '../../stylez/Popup.css';

const FailedPopup = ({ message }) => {
    const nav = useNavigate();

    const redirectToHome = () => {
        nav('/'); // Redirect to the root of the app
    };

    return (
        <div className="popup-background">
            <div className="popup-container">
                <div className="popup-content">
                    <p>{message}</p>
                    <p>This is a restricted area only for Coach's Box admins.</p>
                    <button className="home-button" onClick={redirectToHome}>Go to Home</button>
                </div>
            </div>
        </div>
    );
};

export default FailedPopup;
