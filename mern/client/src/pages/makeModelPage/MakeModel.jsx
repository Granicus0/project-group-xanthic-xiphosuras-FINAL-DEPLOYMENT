import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import "./MakeModel.css";
import FileUpload from '../../components/FileUpload';
import StartTrainingButton from '../../components/StartTrainingButton';

function MakeModel() {
    const [modelName, setModelName] = useState('');
    const [modelType, setModelType] = useState('MLP');
    const [uploadedFile, setUploadedFile] = useState(null);

    // useEffect(() => {
    //     if(uploadedFile) {
    //         console.log(uploadedFile)
    //     }
    // }, [uploadedFile])

    const handleFileUpload = (file) => {
        setUploadedFile(file);
        console.log(file)
    };

    return (
        <div className='makemodel-page-container'>
            <div className="makemodel-header">
                <LogoutButton></LogoutButton>
                <h2 className='makemodel-page-header'>Create a New ML Model</h2>
            </div>

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

                <div className="makemodel-model-type-selection">
                    <h4>Select Model Type:</h4>
                    <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
                        <option value="MLP">MLP (Multilayer Perceptron)</option>
                        <option value="NN">Neural Network</option>
                        <option value="RandomForest">Random Forest Tree</option>
                    </select>
                </div>

                <div className="makemodel-upload-section">
                    <h4> Upload your dataset: </h4>
                    <FileUpload onFileUpload={handleFileUpload}></FileUpload>
                </div>
                
                <StartTrainingButton modelInfo={{modelName, modelType, uploadedFile}}></StartTrainingButton>
            </div>
        </div>
    );
}

export default MakeModel;
