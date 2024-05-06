// Import the useState hook from React for state management
import { useState } from 'react';

// Define a custom hook called `useDeleteModel` for deleting a model entity
const useDeleteModel = () => {

  const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT

  // State variable `isLoading` to track the loading status
  const [isLoading, setIsLoading] = useState(false);
  // State variable `error` to store any error messages that may occur during the delete process
  const [error, setError] = useState('');

  // Define an asynchronous function `deleteModel` to handle the deletion of a model by its ID
  const deleteModel = async (modelId) => {
    // Use a confirmation dialog to ensure user wants to proceed with deletion
    if (!window.confirm("Are you sure you want to delete this model?")) {
      return false; // If user cancels, return false and do not proceed
    }

    // Set `isLoading` to true indicating the start of a deletion process
    setIsLoading(true);
    try {
      // Make an HTTP DELETE request to a specified endpoint with the model ID
      const response = await fetch(`${baseApiRoute}/api/models/${modelId}`, {
        method: 'DELETE'
      });
      // After the request, set `isLoading` to false indicating the process has ended
      setIsLoading(false);

      // Check if the response status is not okay to determine if the deletion was unsuccessful
      if (!response.ok) {
        throw new Error('Failed to delete the model'); // Throw an error if deletion failed
      }
      return true; // Return true if deletion was successful
    } catch (error) {
      // Catch any errors, set the error message, and reset `isLoading`
      setError('Failed to delete the model. Please try again.');
      setIsLoading(false);
      return false; // Return false to indicate the deletion was not successful
    }
  };

  // Return the `deleteModel` function and state variables from the hook for use in components
  return {
    deleteModel,
    isLoading,
    error
  };
};

// Export the `useDeleteModel` hook for use in other parts of the application
export default useDeleteModel;
