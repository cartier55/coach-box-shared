import React from 'react';
import '../../stylez/Banner.css';  // Update the import path as needed
import banner from '../../imgs/coach-box-logo.png'

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner} alt="Banner Logo" />
    </div>
  );
};

export default Banner;
