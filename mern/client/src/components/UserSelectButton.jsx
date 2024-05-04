// Import the CSS file for styling the UserSelectButton component
import './css/UserSelectButton.css' 
// Import React and the useState hook for managing component state
import React, { useState } from 'react';
// Import the ModelGrid component to display models based on selected type
import ModelGrid from '../components/ModelGrid';

// Define the UserSelectButton functional component with `modelData` as a prop
function UserSelectButton({ modelData }) {

    // `activeTab` state to keep track of the selected model type
    const [activeTab, setActiveTab] = useState('default');

    // Function `showModels` returns a ModelGrid component based on `activeTab`
    function showModels() {
        // Switch statement to handle rendering based on `activeTab` value
        switch (activeTab) {
            case 'NN': // Case for neural networks
                return <div><ModelGrid modelData={modelData} modelType="NN"></ModelGrid></div>;
            case 'SVM': // Case for support vector machines
                return <div><ModelGrid modelData={modelData} modelType="SVM"></ModelGrid></div>;
            case 'RF': // Case for random forests
                return <div><ModelGrid modelData={modelData} modelType="RF"></ModelGrid></div>;
            case 'default': // Default case to show all models
                return <div><ModelGrid modelData={modelData}></ModelGrid></div>;
            default: // Fallback default case to handle any unanticipated values
                return <div><ModelGrid modelData={modelData}></ModelGrid></div>;
        }
    }

    // JSX to render the component, includes a container with buttons to select the model type
    return (
        <div>
            <div className='seclectButton-container'>
                <div className="button-group" >
                    <button className="filterbuttonlabel" style={{border: '0px'}}>Filter:
                    </button>
                    <button className="modelbutton" onClick={() => setActiveTab('default')}>All Models
                    </button>
                    <button className="modelbutton" onClick={() => setActiveTab('NN')}>
                        <img src="/src/assets/image/neural-network-logo.jpg" alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} />
                        Neural Network
                    </button>
                    <button className="modelbutton" onClick={() => setActiveTab('SVM')}>
                        <img src="/src/assets/image/SVM-logo.jpg" alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} />
                        Support Vector Machine</button>
                    <button className="modelbutton" onClick={() => setActiveTab('RF')}>
                        <img src="/src/assets/image/RF-logo.png" alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} />
                        Random Forest</button>
                </div>
                {showModels()}  // Call `showModels` function to render the ModelGrid based on selected model type             
            </div>
        </div>
    );
}

// Export the UserSelectButton component for use in other parts of the application
export default UserSelectButton;
