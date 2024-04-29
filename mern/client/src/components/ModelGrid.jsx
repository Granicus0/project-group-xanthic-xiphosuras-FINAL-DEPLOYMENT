import React from 'react';
import ModelCardv2 from './ModelCardv2';
import './css/Grid.css';

// This is just a way to display "ModelCardv2.jsx" in a nice little grid on the user page. 
function ModelGrid({ modelData }) {
  return (
    <div className="grid-container-component">
      {modelData.map((modelInfo) => (
        <ModelCardv2 key={modelInfo._id} modelInfo={modelInfo} /> // Assuming modelInfo has a unique 'id' here
      ))}
    </div>
  );
}

export default ModelGrid;
