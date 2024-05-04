// Import React library for building the component
import React from 'react';
// Import the CSS file for styling the loading page
import './css/LoadingPage.css'; 

// Define a functional React component named `LoadingPage`
function LoadingPage() {
  // Component returns JSX to render on the UI
  return (
    // Main container div for the loading animation, identified by a test ID for testing purposes
    <div className="loading-container" data-testid="loading-container">
      // Child div that acts as the loader animation container
      <div className="loader" data-testid="loader">
        // Three dots represent individual animated elements of the loader
        <div className="dot" data-testid="dot"></div> // First dot
        <div className="dot" data-testid="dot"></div> // Second dot
        <div className="dot" data-testid="dot"></div> // Third dot
      </div>
    </div>
  );
}

// Export the `LoadingPage` component to allow its use in other parts of the application
export default LoadingPage;
