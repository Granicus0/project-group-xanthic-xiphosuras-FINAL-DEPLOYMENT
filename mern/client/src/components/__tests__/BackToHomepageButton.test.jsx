import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@testing-library/react';
import BackToHomepageButton from './BackToHomepageButton';


describe('BackToHomepageButton Component', () => {


   /********************************************************************************************/

    it('see if it renders with the correct text', () => {
        render(<BackToHomepageButton />);
        const backToHomepageButtonElem = screen.getByText(/back to homepage/i)
        expect(backToHomepageButtonElem).toBeInTheDocument();
    });

   /********************************************************************************************/

    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', () => ({
        ...vi.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate,
    }));

    it('calls useNavigate with the correct path on click', () => {
        render(<BackToHomepageButton />);
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
        expect(mockNavigate).toHaveBeenCalledWith('/user');
    });
    
   /********************************************************************************************/

})
