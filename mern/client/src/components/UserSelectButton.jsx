// Import the CSS file for styling the UserSelectButton component
import './css/UserSelectButton.css'
// Import React and the useState hook for managing component state
import React, { useState } from 'react';
// Import the ModelGrid component to display models based on selected type
import ModelGrid from '../components/ModelGrid';

// Define the UserSelectButton functional component with `modelData` as a prop
function UserSelectButton({ modelData }) {

    const nnImgPath = import.meta.env.VITE_ASSETS_FOLDER + '/image/neural-network-logo.jpg'
    const rfImgPath = import.meta.env.VITE_ASSETS_FOLDER + '/image/RF-logo.png'
    const svmImgPath = import.meta.env.VITE_ASSETS_FOLDER + '/image/SVM-logo.jpg'

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
                    <button className="filterbuttonlabel" style={{ border: '0px' }}>Filter:
                    </button>
                    <button className="modelbutton" onClick={() => setActiveTab('default')}>All Models
                    </button>
                    <button className="modelbutton" onClick={() => setActiveTab('NN')}>
                        <img src={nnImgPath} alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} />
                        Neural Network
                    </button>
                    <button className="modelbutton" onClick={() => setActiveTab('SVM')}>
                        <img src={svmImgPath} alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} />
                        Support Vector Machine</button>
                    <button className="modelbutton" onClick={() => setActiveTab('RF')}>
                        <img src={rfImgPath} alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }} />
                        Random Forest</button>
                </div>
                {showModels()}
            </div>
        </div>
    );
}

// Export the UserSelectButton component for use in other parts of the application
export default UserSelectButton;
