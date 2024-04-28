import React from 'react';
import ModelCardv2 from './ModelCardv2';
import './css/Grid.css';

function ModelGrid({ modelData }) {
  return (
    <div className="grid-container-component">
      {modelData.map((modelInfo) => (
        <ModelCardv2 key={modelInfo._id} modelInfo={modelInfo} /> // Assuming modelInfo has a unique 'id'
      ))}
    </div>
  );
}

export default ModelGrid;
