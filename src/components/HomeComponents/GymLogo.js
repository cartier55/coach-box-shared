import React from 'react';
import PropTypes from 'prop-types';
import '../../stylez/GymLogo.css'

function GymLogo({ imgSrc }) {
  return (
    // <div className='gym-container'>
    <div className="gym-logo-container">
      <div className='gym-img-container'>
      <img src={imgSrc} alt="Gym Logo" className="gym-logo" />
      </div>
    </div>
    // </div>
  );
}

GymLogo.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};

export default GymLogo;
