import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import CreateNewModelButton from '../CreateModelButton';
describe('CreateNewModelButton component', () => {

    it('renders the button with the correct text', () => {
        const { getByText } =
        render(
            <BrowserRouter>
                <CreateNewModelButton />
            </BrowserRouter>
        );

        expect(getByText(/create new model/i))
    });

    it('check if button works', () => {

        render(
            <BrowserRouter >
                <CreateNewModelButton />
            </BrowserRouter>
        );

        const navigateButton = screen.getByRole('button', { name: /create new model/i });
        fireEvent.click(navigateButton);

    });
});
