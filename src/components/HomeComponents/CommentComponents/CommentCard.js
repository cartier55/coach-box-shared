import React, { useEffect, useState, useRef } from 'react';
import '../../../stylez/CommentCard.css';
import default_pfp from '../../../imgs/muscle_default.svg'
import { fetchImage } from '../../../services/api_data';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import {useAuth} from '../../../react-query/useAuth'

const CommentCard = ({ comment, recent, removeComment, setUpdateText, setUpdateId}) => {
  
    const [pfp, setPfp] = useState(default_pfp);
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);  // NEW STATE
    const {userData} = useAuth()
    const dropdownRef = useRef(null); // Ref for the dropdown container

    // console.log(comment)
    // console.log(userData)
    

    useEffect(() => {
      const getProfilePicture = async () => {
        try {
          const response = await fetchImage(comment.coach_info.pfp);
          setPfp(response);
        } catch (error) {
          console.error('An error occurred while fetching the profile picture:', error);
        }
      }

      if (comment.coach_info.pfp) {
        console.log(comment.coach_info.first_name);
        console.log("Fetching profile picture");
        getProfilePicture();
      }
    }, [comment.pfp]);

    // Handle the click event for the three-dot menu
    const handleMenuClick = () => {
      console.log("Three-dot menu clicked");
      setDropdownVisibility(!isDropdownVisible);
      console.log(comment)

      // You can add more functionality here
    }


    // This function is triggered when the "Update" button is clicked
    const handleUpdate = async (comment) => {
      console.log(`Updating comment ${comment._id}`)
      console.log(comment)
      setUpdateText(comment.text);  // set the comment text to the state in parent component
      setUpdateId(comment._id);  // set the comment text to the state in parent component
    }

    const handleDelete = async (id) => {
      console.log(`Deleting comment ${id}`);
      setIsDeleting(true);  // SET STATE TO TRUE
      try {
        await removeComment(id);
      } catch (error) {
        console.error('Failed to delete comment', error);
        setIsDeleting(false);  // RESET STATE TO FALSE
      } finally {
        setIsDeleting(false);  // RESET STATE TO FALSE
      }
    }


    useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setDropdownVisibility(false);
          }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
          document.removeEventListener('click', handleClickOutside);
      };
  }, []);

  return (
        <div className={`comment-card ${isDeleting ? 'comment-card-deleting' : ''}`}>
            <img src={pfp} alt="Profile" className="profile-pic" />
            <div className="comment-info">
                <span className="user-name">{comment.userName}</span>
                <p className="comment-text">{comment.text}</p>
            </div>
            {recent || <div className="menu-container" ref={dropdownRef}>
                <BiDotsVerticalRounded className="three-dot-menu" onClick={handleMenuClick} />
                {isDropdownVisible && comment.coach_info.email === userData.email && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => handleUpdate(comment)}>Update</div>
                        <div className="dropdown-item" onClick={() => handleDelete(comment._id)}>Delete</div>
                    </div>
                )}
            </div>}
        </div>
    );
};

export default CommentCard;
