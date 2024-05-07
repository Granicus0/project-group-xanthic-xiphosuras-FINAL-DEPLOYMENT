// Import the useState hook from React for state management
import { useState } from 'react';

// Define a custom hook called `usegetModel` for deleting a model entity
const useGetModel = () => {
  // State variable `isLoading` to track the loading status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT

  // Define an asynchronous function `getModel` to handle the deletion of a model by its ID
  const getModel = async (modelId) => {
    // Set `isLoading` to true indicating the start of a deletion process
    setIsLoading(true);
    try {
      // Make an HTTP get request to a specified endpoint with the model ID
      const response = await fetch(`${baseApiRoute}/api/models/${modelId}`, {
        method: 'GET'
      });
      // After the request, set `isLoading` to false indicating the process has ended
      setIsLoading(false);

      // Check if the response status is not okay to determine if the deletion was unsuccessful
      if (!response.ok) {
        throw new Error('Failed to get the model'); // Throw an error if deletion failed
      }
      return response.json();
    } catch (error) {
      // Catch any errors, set the error message, and reset `isLoading`
      setError('Failed to get the model. Please try again.');
      setIsLoading(false);
      return false; // Return false to indicate the deletion was not successful
    }
  };

  // Return the `getModel` function and state variables from the hook for use in components
  return {
    getModel,
    isLoading,
    error
  };
};

// Export the `usegetModel` hook for use in other parts of the application
export default useGetModel;
