import React from 'react';
import ModelCardv2 from './ModelCardv2';
import './css/Grid.css';

function ModelGrid({ modelData, modelType }) {
  
  const filteredModelData = modelType ? modelData.filter(info => info.model_type === modelType) : modelData;

  return (
    <div className="grid-container-component">
      {filteredModelData.map((modelInfo) => (
        <ModelCardv2 key={modelInfo._id} modelInfo={modelInfo} />
      ))}
    </div>
  );
}

export default ModelGrid;
