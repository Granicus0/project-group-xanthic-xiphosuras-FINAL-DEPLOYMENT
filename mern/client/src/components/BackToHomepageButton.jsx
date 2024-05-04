// Importing the `useNavigate` hook from `react-router-dom` for programmatic navigation
import { useNavigate } from "react-router-dom";
// Importing custom CSS styles for the button
import './css/BackToHomepageButton.css'

// Define a React functional component named `BackToHomepageButton`
const BackToHomepageButton = () => {
    // `useNavigate` hook is used to get the `navigate` function which allows for navigating programmatically
    const navigate = useNavigate()
    
    // Define `handleClick` function that navigates to the '/user' route when called
    const handleClick = () => {
        navigate('/user')
    }
    
    // Render a button element with a custom class and an onClick event handler that calls `handleClick`
    return (
        <button className='back-to-homepage-button-component' onClick={handleClick}>Back to homepage</button>
    )
}

// Export the `BackToHomepageButton` component to be used in other parts of the application
export default BackToHomepageButton
