import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import "./MakeModel.css";
import FileUpload from '../../components/FileUpload';
import StartTrainingButton from '../../components/StartTrainingButton';
import CSVViewer from '../../components/CSVViewer';
// This is a page to *create* an ML model (NOT select a model and use it)
function MakeModel() {
    const [modelName, setModelName] = useState('');
    const [modelType, setModelType] = useState('SVM');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showCSV, setShowCSV] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState('');

    const userDat = localStorage.getItem('user')
    const json = JSON.parse(userDat);
    const userId = json._id;

    // Used by the "FileUpload" component below. Scroll down and read what it does.
    const handleFileUpload = (file) => {
        setUploadedFile(file);
    };

    return (
        <div className='makemodel-page-container'>
            <div className="makemodel-header">
                <LogoutButton></LogoutButton>
                <h2 className='makemodel-page-header'>Create a New ML Model</h2>
            </div>

            {/* An area for the user to type in what they want to name this model they're about to make */}
            <div className="makemodel-content-area">
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

                {/* An area for the user to select the model type. By default it's MLP as per the state hook at the top */}
                <div className="makemodel-model-type-selection">
                    <h4>Select Model Type:</h4>
                    <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
                        <option value="SVM">SVM (Support Vector Machine)</option>
                        <option value="NN">NN (Neural Network)</option>
                        <option value="RF">RF (Random Forest Tree)</option>
                    </select>
                </div>

                {/* An area for the user upload their dataset. */}
                <div className="makemodel-upload-section">
                    <h4> Upload your dataset: </h4>

                    {/* We pass in handleFileUpload, then this "FileUpload" component will actually give us the file */}
                    <FileUpload onFileUpload={handleFileUpload}></FileUpload>
                    {/* Button to toggle CSV Viewer */}
                    {/* {uploadedFile && (
                        <button className='makemodel-toggle-show-csv-button' onClick={() => setShowCSV(!showCSV)}>
                            {showCSV ? 'Hide CSV Data' : 'Show CSV Data'}
                        </button>
                    )} */}
                </div>

                {/* Conditionally render CSVViewer */}
                {uploadedFile && <CSVViewer
                    csvFile={uploadedFile}
                    onColumnSelect={(column) => setSelectedColumn(column)}
                />}

                {/* Pass in model information to our StartTrainingButton component. */}
                <StartTrainingButton modelInfo={{ modelName, modelType, uploadedFile, userId, selectedColumn }}></StartTrainingButton>
            </div>
        </div>
    );
}

export default MakeModel;
