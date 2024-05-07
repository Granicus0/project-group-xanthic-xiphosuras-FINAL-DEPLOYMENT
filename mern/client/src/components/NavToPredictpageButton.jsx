import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/BackToHomepageButton.css';
import useGetModel from '../hooks/useGetModel';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavToPredictpageButton = ({ Model_id }) => {
    const navigate = useNavigate();
    const { getModel, isLoading, error } = useGetModel();
    const [Modelinfo, setModelinfo] = useState({});

    // Define `handleClick` function that optionally fetches model details then navigates
    const handleClick = async () => {
        console.log("Fetching model details for ID:", Model_id);
        const success = await getModel(Model_id);
        console.log("Success:", success);
        if (success) {
            console.log("Model details fetched, navigating to /useModel");
            setModelinfo(success);
            navigate("/useModel", { state: { modelInfo: success } });
            
        } else {
            console.error("Failed to fetch model details:", error);
        }
    };
    
    // Render a button element with a custom class and an onClick event handler that calls `handleClick`
    return (
            <button className='back-to-homepage-button-component' onClick={handleClick} disabled={isLoading}>
                Predict with Trained Model
            </button>
    );
}

export default NavToPredictpageButton;
