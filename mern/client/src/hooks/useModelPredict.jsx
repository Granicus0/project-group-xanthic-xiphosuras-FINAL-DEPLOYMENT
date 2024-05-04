// Import the useState hook from React to manage state within the hook
import { useState } from 'react'
// Import useNavigate from react-router-dom for navigating between routes
import { useNavigate } from 'react-router-dom'
// Import axios to make HTTP requests
import axios from 'axios'

// Define a custom hook named `useModelPredict` for handling model prediction requests
export const useModelPredict = () => {
    // State variable `error` to store any error information
    const [error, setError] = useState(null)
    // State variable `isLoading` to indicate whether a prediction is in progress
    const [isLoading, setIsLoading] = useState(null)

    // Define an asynchronous function `predictModel` to send a file for prediction
    const predictModel = async (_id, uploadedFile) => {
        // Set loading state to true at the start of the function
        setIsLoading(true)
        // Clear any previous errors at the start of a new prediction attempt
        setError(null)

        // Create a new FormData object for sending the file and id to the server
        const formData = new FormData();
        formData.append('_id', _id); // Append model ID to the form data
        formData.append('csvFile', uploadedFile); // Append file to be predicted

        try {
            // Make a POST request using axios to the server's prediction endpoint
            const response = await axios.post('http://localhost:5050/api/models/predictModel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type for file upload
                }
            });
            // Log the server's response to the console for debugging
            console.log("Prediction started: ", response);
        } catch (error) {
            // Handle errors by logging them to the console and setting the error state
            console.error("Error starting predicting:", error);
        }
    }

    // Return the `predictModel` function and state variables so they can be used in components
    return { predictModel, isLoading, error }
}
