import './css/UserSelectButton.css' 
import React, { useState } from 'react';
import ModelGrid from '../components/ModelGrid';

function UserSelectButton({ modelData }) {

    const [activeTab, setActiveTab] = useState('default');

    function showModels() {
        switch (activeTab) {
            case 'NN':
                return <div><ModelGrid modelData={modelData} modelType="NN"></ModelGrid></div>;
            case 'SVM':
                return <div><ModelGrid modelData={modelData} modelType="SVM"></ModelGrid></div>;
            case 'RF':
                return <div><ModelGrid modelData={modelData} modelType="RF"></ModelGrid></div>;
            case 'default':
                return <div><ModelGrid modelData={modelData} ></ModelGrid></div>;
            default:
                return <div><ModelGrid modelData={modelData} ></ModelGrid></div>;
        }
    }

    return (
        <div>
            <div className='seclectButton-container'>
              <div className="button-group">
                <button className="modelbutton" onClick={() => setActiveTab('default')}>All Models
                </button>
                <button className="modelbutton" onClick={() => setActiveTab('NN')}>
                    <img src="/src/assets/image/neural network logo.jpg" alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                    Neural Network
                </button>
                <button className="modelbutton" onClick={() => setActiveTab('SVM')}>
                    <img src="/src/assets/image/SVM logo.jpg" alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                    Support Vector Machine</button>
                <button className="modelbutton" onClick={() => setActiveTab('RF')}>
                    <img src="/src/assets/image/RF logo.png" alt="Icon" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                    Random Forest</button>
                
              </div>
               {showModels()}               
            </div>
        </div>
    );
}

export default UserSelectButton;