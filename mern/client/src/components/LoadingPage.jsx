import React from 'react';
import './css/LoadingPage.css'; // Import the CSS file

function LoadingPage() {
  return (
    <div className="loading-container" data-testid="loading-container">
      <div className="loader" data-testid="loader">
        <div className="dot" data-testid="dot"></div>
        <div className="dot" data-testid="dot"></div>
        <div className="dot" data-testid="dot"></div>
      </div>
    </div>
  );
}

export default LoadingPage;
