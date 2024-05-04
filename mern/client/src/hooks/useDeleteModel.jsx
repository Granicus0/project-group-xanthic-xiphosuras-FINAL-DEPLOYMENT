import { useState } from 'react';

const useDeleteModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteModel = async (modelId) => {
    if (!window.confirm("Are you sure you want to delete this model?")) {
      return false;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5050/api/models/${modelId}`, {
        method: 'DELETE'
      });
      setIsLoading(false);

      if (!response.ok) {
        throw new Error('Failed to delete the model');
      }
      return true;
    } catch (error) {
      setError('Failed to delete the model. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  return {
    deleteModel,
    isLoading,
    error
  };
};

export default useDeleteModel;
