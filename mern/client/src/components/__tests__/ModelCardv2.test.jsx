import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModelCardv2 from '../ModelCardv2';

describe('ModelCardv2 component', () => {

    const nnImgPath = 'src/assets/image/neural-network-logo.jpg'
    const rfImgPath = 'src/assets/image/RF-logo.png'
    const svmImgPath = 'src/assets/image/SVM-logo.jpg'

  it('renders without crashing', () => {
    const modelInfo = {
        model_name: 'Test Model',
        model_type: 'NN'
      };
    render(<Router><ModelCardv2 modelInfo={modelInfo} /></Router>);
  });

  it('displays model name and type', () => {
    const modelInfo = {
        model_name: 'Test Model',
        model_type: 'NN'
      };
    const { getByText } = render(<Router><ModelCardv2 modelInfo={modelInfo} /></Router>);
    expect(getByText('Test Model'));
    expect(getByText('NN'));
  });

  it('displays default image for unknown model types', () => {
    const modelInfo = {
        model_name: 'Test Model',
        model_type: 'NN'
      };
    const { getByAltText } = render(<Router><ModelCardv2 modelInfo={{ model_name: 'Unknown Model', model_type: 'ABC' }} /></Router>);
    const image = getByAltText('Model representation');
    expect(image.src).toContain("https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg");
  });

  it('displays correct image for NN model types', () => {
    const modelInfo = {
        model_name: 'Test Model',
        model_type: 'NN'
      };
    const { getByAltText } = render(<Router><ModelCardv2 modelInfo={modelInfo} /></Router>);
    const image = getByAltText('Model representation');
    expect(image.src).toContain('http://localhost:3000/' + nnImgPath);
  });

  it('displays correct image for RF model types', () => {
    const modelInfo = {
        model_name: 'Test Model',
        model_type: 'RF'
      };
    const { getByAltText } = render(<Router><ModelCardv2 modelInfo={modelInfo} /></Router>);
    const image = getByAltText('Model representation');
    expect(image.src).toContain('http://localhost:3000/' + rfImgPath);
  });


  it('displays correct image for SVM model types', () => {
    const modelInfo = {
        model_name: 'Test Model',
        model_type: 'SVM'
      };
    const { getByAltText } = render(<Router><ModelCardv2 modelInfo={modelInfo} /></Router>);
    const image = getByAltText('Model representation');
    expect(image.src).toContain('http://localhost:3000/' + svmImgPath);
  });
});
