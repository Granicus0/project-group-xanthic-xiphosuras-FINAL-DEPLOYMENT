import React, { useState } from 'react';
import './css/FileUpload.css'
import InvalidDataTypealert from './InvalidDataTypealert';
import { useDisclosure } from '@chakra-ui/react'

// File upload component. We pass in a prop 'onFileUpload', which will take in an argument 'file' so we can
// give this file to the parent component.
function FileUpload({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Handles changes to the file input
  const handleFileChange = (event) => {
    const file = event.target.files[0];   // Get the first selected file
    if(file.name.endsWith('.csv')){
      setSelectedFile(file);                // Store it in the state
      onFileUpload(file);                   // Pass the file to a parent component
    }
    else{
      onOpen();
    }
    
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        className="file-upload-button-component"
      />
      {/* Custom Button: Clicking this triggers the hidden input */}
      <label htmlFor="file-upload" className="file-upload-button">
        Choose File
      </label>
      {/* Display file name if one is selected */}
      {selectedFile && <span className="file-name">{selectedFile.name}</span>}
      <InvalidDataTypealert Button_info={{ isOpen, onClose }}/>
    </div>
  );
}

export default FileUpload;
