import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import StartPredictingButton from '../StartPredictingButton';
const csvFile = new File(['column1,column2\nvalue1,value2\nvalue3,value4'], 'data.csv', { type: 'text/csv' });
const modelInfo = {
    _id: 1,
    model_name: 'Model 1',
    model_type: 'NN',
    uploadedFile: csvFile
};


describe('CreateNewModelButton component', () => {

    it('renders the button', () => {
        const { getByRole } =
            render(
                <BrowserRouter>
                    <StartPredictingButton modelInfo={modelInfo} />
                </BrowserRouter>
            );

        expect(getByRole('button'))
    });

    // TODO ADD MORE TESTS ONCE THIS COMPONENT IS COMPLETED
});
