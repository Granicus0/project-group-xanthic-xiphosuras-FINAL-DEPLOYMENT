import React, { useEffect, useState } from 'react';
import ModelCard from '../../components/ModelCard';
import ModelCardv2 from '../../components/ModelCardv2';
import {useLogout} from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import "./UserPage.css";

function UserPage() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useLogout();
  const navigate = useNavigate()

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

  const handleLogout = () => {
    logout()
    navigate('/')
  }


  return (
    <div className='user-page-container'>
      <h1 className='user-page-header'> Hello, {userName}! </h1>
      <br></br>
      <button onClick={handleLogout}> Logout </button>
      <h4 className='user-page-sub-header'> Your Current Models </h4>
      <div className="model-card-container2">
        {models && models.map((model) => (
          <ModelCardv2 key={model._id} modelInfo={model} />
        ))}

      </div>
      <div className="model-card-container">
        {models && models.map((model) => (
          <ModelCard key={model._id} modelInfo={model} />
        ))}

      </div>

    </div>

  );

}

export default UserPage;
