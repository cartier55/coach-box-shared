import React from 'react';
import '../../stylez/DailyVid.css';

const DailyCoachVideo = ({ youtubeLink }) => {
  console.log(youtubeLink);
  const videoId = youtubeLink.split('/')[3]; // Extract video ID from YouTube link
  
  return (
    <div className="daily-coach-video">
      <h2>Daily Coach Video</h2>
      <div className="video-container">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title="Daily Coach Video"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );
};

export default DailyCoachVideo;
