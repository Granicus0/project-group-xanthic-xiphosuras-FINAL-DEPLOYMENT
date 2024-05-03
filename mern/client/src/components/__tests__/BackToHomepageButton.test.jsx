import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BackToHomepageButton from '../BackToHomepageButton';

describe('BackToHomepageButton Component', () => {

    /********************************************************************************************/

    it('see if it renders with the correct text', () => {


        const { getByText } =
            render(
                <BrowserRouter>
                    <BackToHomepageButton />
                </BrowserRouter>
            );

        expect(getByText(/back to homepage/i))

    });

    it('see if button works', () => {
        render(
            <BrowserRouter>
                <BackToHomepageButton />
            </BrowserRouter>
        );

        const navigateButton = screen.getByRole('button', { name: /back to homepage/i });
        fireEvent.click(navigateButton);

    })

    /********************************************************************************************/

})
