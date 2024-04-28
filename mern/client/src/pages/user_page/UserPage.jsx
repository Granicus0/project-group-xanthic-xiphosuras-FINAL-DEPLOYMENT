import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton'
import CreateModelButton from '../../components/CreateModelButton'; 

import { useLogout } from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom';
import "./UserPage.css";
import ModelGrid from '../../components/ModelGrid';

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
      <div className='user-page-container'>
        <h1 className='user-page-header'> Hello, {userName}! </h1>
        <CreateModelButton></CreateModelButton>
        <LogoutButton></LogoutButton>
        <h4 className='user-page-sub-header'> Your Current Models </h4>
        <br></br>
        <h5 className='user-page-sub-header'> Click one to make some predictions! </h5>
        <ModelGrid modelData={models}></ModelGrid>

      </div>

  );

}

export default UserPage;
