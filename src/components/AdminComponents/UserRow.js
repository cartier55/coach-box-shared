import React, { useState } from 'react';
import { FaRunning, FaBed, FaCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
// import styles from '../stylez/UserRow.module.css'; // Assuming you move UserRow specific styles here
import styles from '../../stylez/AdminPage.module.css';
import ProfilePictureViewer from '../SettingsComponents/PFPViewer';
import default_pfp from '../../imgs/muscle_default.svg'
import { useEffect } from 'react';
import { fetchImage } from '../../services/api_data';

const UserRow = ({ user }) => {
    
    const [pfp, setPfp] = useState(default_pfp);

    useEffect(() => {
        const getProfilePicture = async () => {
          try {
            const response = await fetchImage(user.image_url);
            setPfp(response);
          } catch (error) {
            console.error('An error occurred while fetching the profile picture:', error);
          }
        }
    
        if (user.image_url) {
          console.log(user.first_name);
          console.log("Fetching profile picture");
          getProfilePicture();
        }
      }, [user.image_url]);

    


    return (
    <div className={styles.userRow} onClick={() => console.log(user.name)}>
      <div className={styles.profilePicPlaceholder}>
        <ProfilePictureViewer src={pfp} size={40} alt={user.first_name} />
        {/* Placeholder for profile picture */}
      </div>
      <div className={styles.userName}>
        {user.first_name}
      </div>
      <div className={styles.userStatus}>
        {user.isActive ? <FaRunning size={20} color="green" /> : <FaBed size={20} color="red" />}
        {user.welcomed ? <FaCheckCircle size={20} color="green" /> : <FaRegTimesCircle size={20} color="red" />}
      </div>
    </div>
  );
}
  

export default UserRow;
