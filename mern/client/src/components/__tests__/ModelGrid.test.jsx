import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ModelGrid from '../ModelGrid';
import { BrowserRouter } from 'react-router-dom';

describe('ModelGrid component', () => {
    const modelData = [
        { _id: 1, model_name: 'Model 1', model_type: 'NN' },
        { _id: 2, model_name: 'Model 2', model_type: 'RF' },
        { _id: 3, model_name: 'Model 3', model_type: 'SVM' }
    ];

    it('renders without crashing with null data', () => {
        render(<ModelGrid modelData={[]} />);
    });

    it('renders without crashing with input data', () => {
        render(
            <BrowserRouter>
                <ModelGrid modelData={modelData} />
            </BrowserRouter>
        );
    });

    it('displays all model cards', async () => {
        const { getAllByTestId } = render(
            <BrowserRouter>
                <ModelGrid modelData={modelData} />
            </BrowserRouter>
        );
        await waitFor(() => {
            const modelCards = getAllByTestId('grid-container-component-test');
            expect(modelCards.length).toEqual(1)
        })

        
    });

      it('renders model cards with correct data', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ModelGrid modelData={modelData} />
            </BrowserRouter>
        );
        expect(getByText('Model 1'));
        expect(getByText('Model 2'));
        expect(getByText('Model 3'));
      });
});
