import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LogoutButton from '../LogoutButton';
import { AuthContextProvider } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';


describe('LogoutButton component', () => {
     
    it('renders without crashing', () => {
        render(
            <AuthContextProvider>
                <BrowserRouter>
                    <LogoutButton />
                </BrowserRouter>
            </AuthContextProvider>
        );
    });

    it('see if button is present and clickable', () => {
        const {getByRole} = render(
            <AuthContextProvider>
                <BrowserRouter>
                    <LogoutButton />
                </BrowserRouter>
            </AuthContextProvider>
        );

        const navigateButton = getByRole('button');
        fireEvent.click(navigateButton);
    })

});
