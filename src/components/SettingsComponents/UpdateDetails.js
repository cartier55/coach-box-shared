import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Tooltip, Overlay, Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ProfilePictureViewer from './PFPViewer';
import default_pfp from '../../imgs/muscle_default.svg'
import {useAuth} from '../../react-query/useAuth'
import { fetchImage } from '../../services/api_data';

const UpdateDetails = () => {
    const {userData, updateUserDetails} = useAuth();    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);
    const [profilePictureFile, setProfilePictureFile] = useState(null); // New state for the selected profile picture file
    const [profilePicture, setProfilePicture] = useState(null); // new state for the uploaded image
    const [hasNewProfilePic, setHasNewProfilePic] = useState(false); // new state to track changes
    const target = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Create an object for user details
          const userDetails = {
            first_name: firstName,
            last_name: lastName,
            email: email,
          };
    
          // Call the updateUserDetails function from the useAuth hook
          await updateUserDetails(userDetails, profilePictureFile);
    
          // Handle success or display a success message
          // ...
    
        } catch (error) {
          // Handle errors
          console.error("Failed to update details:", error);
        }
      };

    // This function handles the change in the profile picture input
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePictureFile(file); // Set the selected profile picture file
                setProfilePicture(reader.result); // Set the profile picture using the base64 data
                setHasNewProfilePic(true); // Set the flag to true when a new picture is uploaded
            };
            reader.readAsDataURL(file);
        }
    };
    

     // Use useEffect to set the initial state of profilePicture
    useEffect(() => {
        if (!hasNewProfilePic) { // Only run if there's no new picture uploaded
            const fetchInitialProfilePicture = async () => {
            if (userData.image_url && userData.image_url !== "") {
                try {
                    const fetchedImage = await fetchImage(userData.image_url);
                    setProfilePicture(fetchedImage);
                } catch (error) {
                    console.error("Failed to fetch initial profile picture:", error);
                    setProfilePicture(default_pfp); // Fallback to default if fetch fails
                }
            } else {
                setProfilePicture(default_pfp); // Fall back to default_pfp if no image_url
            }
        };
        fetchInitialProfilePicture();
    }
}, [userData, hasNewProfilePic]); // Include hasNewProfilePic in the dependency array


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [showTooltip]);
    
    return (
        // <Container>
        //     <h1 style={{ textAlign: "center" }}>Update Details</h1>
        //     <Form onSubmit={handleSubmit}>
        <Container>
        <h1 style={{ textAlign: "center" }}>Update Details</h1>
        <Form onSubmit={handleSubmit}>
            {/* Profile Picture Upload */}
            <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                {/* <Form.File onChange={handleProfilePicChange} /> */}
                <input type="file" onChange={handleProfilePicChange} />
                <ProfilePictureViewer src={profilePicture ? profilePicture : default_pfp} size={150} alt="Updated Profile"/>
            </Form.Group>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" style={{marginTop:"10px"}} onSubmit={handleSubmit}>Update</Button>
            </Form>
        </Container>
    );
}

export default UpdateDetails;
