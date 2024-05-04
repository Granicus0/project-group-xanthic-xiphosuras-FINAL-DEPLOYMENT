import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserSelectButton from '../UserSelectButton';
import { BrowserRouter } from 'react-router-dom';

describe('UserSelectButton component', () => {
    const modelData = [
        { _id: 1, model_name: 'Model 1', model_type: 'NN' },
        { _id: 2, model_name: 'Model 2', model_type: 'RF' },
        { _id: 3, model_name: 'Model 3', model_type: 'SVM' }
    ];

    it('renders without crashing', () => {
        render(
        <BrowserRouter>
            <UserSelectButton modelData={modelData} />
        </BrowserRouter>);
    });

    it('displays all models when "All Models" button is clicked', () => {
        const { getByText } = render(
            <BrowserRouter>
                <UserSelectButton modelData={modelData} />
            </BrowserRouter>
        );
        fireEvent.click(getByText('All Models'));
        expect(getByText('Model 1'));
        expect(getByText('Model 2'));
        expect(getByText('Model 3'));
    });

    it('displays only Neural Network models when "Neural Network" button is clicked', () => {
        const { getByText, queryByText } = render(
            <BrowserRouter>
                <UserSelectButton modelData={modelData} />
            </BrowserRouter>
        );
        fireEvent.click(getByText('Neural Network'));
        expect(getByText('Model 1'));
        expect(queryByText('Model 2')).toBeNull();
        expect(queryByText('Model 3')).toBeNull();
    });

    it('displays only Support Vector Machine models when "Support Vector Machine" button is clicked', () => {
        const { getByText, queryByText } = render(
            <BrowserRouter>
                <UserSelectButton modelData={modelData} />
            </BrowserRouter>
        );
        fireEvent.click(getByText('Support Vector Machine'));
        expect(queryByText('Model 1')).toBeNull();
        expect(queryByText('Model 2')).toBeNull();
        expect(getByText('Model 3'));
    });

    it('displays only Random Forest models when "Random Forest" button is clicked', () => {
        const { getByText, queryByText } = render(
            <BrowserRouter>
                <UserSelectButton modelData={modelData} />
            </BrowserRouter>);
        fireEvent.click(getByText('Random Forest'));
        expect(queryByText('Model 1')).toBeNull();
        expect(getByText('Model 2'));
        expect(queryByText('Model 3')).toBeNull();
    });
});
