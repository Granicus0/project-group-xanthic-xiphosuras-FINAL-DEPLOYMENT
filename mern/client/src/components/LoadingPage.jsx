import React from 'react';
import './css/LoadingPage.css'; // Import the CSS file

function LoadingPage() {
  return (
    <div className="loading-container">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default LoadingPage;
