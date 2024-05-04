import React from 'react';
import ModelCardv2 from './ModelCardv2';
import './css/Grid.css';
import { useState } from 'react';
function ModelGrid({ modelData, modelType }) {
  



  const filteredModelData = modelType ? modelData.filter(info => info.model_type === modelType) : modelData;


  const handleModelRemove = (modelId) => {
    // Update the state to remove the model
    setModelData(currentData => currentData.filter(model => model._id !== modelId));
  };

  return (
    <div className="grid-container-component">
      {filteredModelData.map((modelInfo) => (
        <ModelCardv2 key={modelInfo._id} modelInfo={modelInfo}/>
      ))}
    </div>
  );
}

export default ModelGrid;
