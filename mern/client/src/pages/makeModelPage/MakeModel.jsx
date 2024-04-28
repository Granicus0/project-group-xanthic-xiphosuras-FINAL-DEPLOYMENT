import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import "./MakeModel.css";
import FileUpload from '../../components/FileUpload';
import StartTrainingButton from '../../components/StartTrainingButton';

function MakeModel() {
    const [modelName, setModelName] = useState('');

    return (
        <div className='makemodel-page-container'>
            <div className="header"> 
                <LogoutButton></LogoutButton>
                <h2 className='makemodel-page-header'>Create a New ML Model</h2>
            </div>

            <div className="content-area">
                <div className="model-name-input">
                    <label htmlFor="model-name">Model Name:</label>
                    <input
                        type="text"
                        id="model-name"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        placeholder="Enter model name"
                    />
                </div>

                <div className="upload-section">
                    <h4> Upload your dataset: </h4>
                    <FileUpload></FileUpload>
                </div>

                <StartTrainingButton></StartTrainingButton>
            </div>
        </div>
    );
}

export default MakeModel;
