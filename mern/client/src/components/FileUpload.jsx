import React, { useState } from 'react';
import './css/FileUpload.css'
function FileUpload({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileUpload(file); 
  };

  return (
    <div className="file-upload-container">
      <input 
        type="file" 
        id = "file-upload"
        onChange={handleFileChange} 
        className="file-upload-button-component" 
      />
      <label htmlFor="file-upload" className="file-upload-button">
        Choose File
      </label>
      {selectedFile && <span className="file-name">{selectedFile.name}</span>} 
    </div>
  );
}

export default FileUpload;
