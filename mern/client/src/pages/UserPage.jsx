import React, { useEffect, useState } from 'react';
import ModelCard from '../components/ModelCard';
import { useAuthContext } from '../hooks/useAuthContext';

function UserPage() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userDat = localStorage.getItem('user')
  const json = JSON.parse(userDat);
  const userId = json._id;
  const userName = json.name;

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5050/api/models/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const data = await response.json();
        setModels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1> Hello, {userName}! </h1>
      <br></br>
      <h4> Your Current Models </h4>
      <div className="model-card-container">

        {models && models.map((model) => (
          <ModelCard key={model._id} modelInfo={model} />
        ))}

      </div>

    </div>

  );

}

export default UserPage;
