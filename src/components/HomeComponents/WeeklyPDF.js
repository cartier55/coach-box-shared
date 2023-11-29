import React from 'react';
import { Button } from 'react-bootstrap'; // Using react-bootstrap for styling the button
import cover from '../../imgs/gym_prog_front.jpg'
import '../../stylez/WeeklyPDF.css';

const WeeklyWorkoutPDFLink = ({ pdfLink, coverImageLink }) => {
  return (
    <div className='weekly-workout-container'>
    <h2 className='weekly-workout-title'>Weekly Programming</h2>
    <div className="weekly-workout-pdf-link">
      <a href={pdfLink} target="_blank" rel="noopener noreferrer">
        <img src={cover} alt="Weekly Workout PDF Cover" className="pdf-cover-image"/>
      </a>
    </div>
    </div>
  );
};

export default WeeklyWorkoutPDFLink;
