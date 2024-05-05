import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/BackToHomepageButton.css'

const NavToPredictpageButton = () => {
    const navigate = useNavigate()
    
    // Define `handleClick` function that navigates to the '/user' route when called
    const handleClick = () => {
        navigate('/useModel')
    }
    
    // Render a button element with a custom class and an onClick event handler that calls `handleClick`
    return (
        <button className='back-to-homepage-button-component' onClick={handleClick}>Predict with Trained Model</button>
    )
}

export default NavToPredictpageButton