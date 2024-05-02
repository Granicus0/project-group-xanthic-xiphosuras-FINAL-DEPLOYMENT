import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BacktofileButton from '../../components/BacktofileButton';
import FileUpload from '../../components/FileUpload';
import StartPredictingButton from '../../components/StartPredictingButton';
import './useModelPage.css'; 

// This is a react component page that shows the model the user has just chosen and allows them to basically start training
const UseModelPage = () => {
    const location = useLocation();
    // We don't pass in any props since this page will be called from the UserPage.jsx which doesn't contain this component. Instead we just pass in 
    // props via a <Link/> and grab the modelInfo this way. This is generally NOT GOOD PRACTICE! But it makes things easier for now
    const modelInfo = location.state?.modelInfo;
    const [uploadedFile, setUploadedFile] = useState(null);
    // Destructing all that info into its constituents.
    const { _id, model_name, model_address, metaData_address, model_description, model_type, user } = modelInfo || {};

    const handleFileUpload = (file) => {
        setUploadedFile(file);
    };

    // I can't be bothered commenting this part.
    return (
        <div className='usemodel-page-container'>
            <div className="header">
                <BacktofileButton></BacktofileButton>
                <h2 className='usemodel-page-header'>Start predicting with your model!</h2>
            </div>

            <div className="content-area">
                <div className="usemodel-model-info">
                
                    <h3>Model Details</h3>
                    <div className="info-item">
                            <span className="info-label">ID:</span> {_id}
                        </div>
                    <div className="model-info-grid">
                    
                        <div className="info-item">
                            <span className="info-label">Name:</span> {model_name}
                        </div>
                        <div className="info-item">
                            <span className="info-label">Type:</span> {model_type}
                        </div>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Trained Label:</span> {model_address}
                    </div>
                    {model_description && (
                        <div className="model-description">
                            <span className="info-label">Description:</span> {model_description}
                        </div>
                    )}
                </div>

                <div className="upload-section">
                    <h4> Upload your testing dataset: </h4>
                    <FileUpload onFileUpload={handleFileUpload}></FileUpload>
                </div>

                <StartPredictingButton modelInfo={{_id, uploadedFile}}></StartPredictingButton>

            </div>
        </div>
    );
}

export default UseModelPage;
