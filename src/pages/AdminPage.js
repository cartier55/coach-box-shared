import React, { useEffect } from 'react';
import { FaRunning, FaBed } from 'react-icons/fa';
import styles from '../stylez/AdminPage.module.css';
import { useAdmin } from '../react-query/useAdmin';
import { useState } from 'react';
import FailedPopup from '../components/AdminComponents/VerifiyFailedPopup';

  const AdminPage = () => {
    const { users, verify, adminVerificationError } = useAdmin();
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        console.log('useEffect');
        const verifyAdmin = async () => {
          await verify();
        };
        verifyAdmin();
      }, []);
      
      useEffect(() => {
        console.log('adminVerificationError effect');
        console.log(showPopup);
        console.log(adminVerificationError);
      
        if (adminVerificationError) {
          console.log('adminVerificationError detected');
          setShowPopup(true);
        }
      }, [adminVerificationError]);

    return (
      <div className={styles.adminPageContainer}>
        {/* <div className={styles.userTable}>
          {users.map((user, index) => (
            <UserRow key={index} user={user} />
          ))}
        </div> */}
        <h1 style={{textAlign:"center"}}>Admin Panel</h1>
        {showPopup && adminVerificationError && (
        <FailedPopup 
          message={adminVerificationError} 
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
    );
  };
  
  export default AdminPage;