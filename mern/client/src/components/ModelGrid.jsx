import React from 'react';
import ModelCardv2 from './ModelCardv2';
import './css/Grid.css';

function ModelGrid({ modelData, modelType }) {

  const filteredModelData = modelType ? modelData.filter(info => info.model_type === modelType) : modelData;

  return (
    <div className="grid-container-component" data-testid="grid-container-component-test">
    {filteredModelData.length > 0 ? (
      filteredModelData.map((modelInfo) => (
        <ModelCardv2 key={modelInfo._id} modelInfo={modelInfo} data-testid="model-card-test" />
      ))
    ) : (
      <p className="no-data">Looks like you don't have any models. Go ahead and create a new one! </p>
    )}
  </div>
  );
}

export default ModelGrid;
