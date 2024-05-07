import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton'
import CreateModelButton from '../../components/CreateModelButton';
import { BarLoader } from 'react-spinners';
import "./UserPage.css";
import UserSelectButton from '../../components/UserSelectButton';

function UserPage() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userDat = localStorage.getItem('user')
  const json = JSON.parse(userDat);
  const userId = json._id;
  const userName = json.name;
  const baseApiRoute = import.meta.env.VITE_BASE_API_ENDPOINT

  // TODO CHANGE THIS LATER SO THAT THE MODELS ARE UPDATED AS THE USER CREATES THEM. RIGHT NOW IF THE USER CREATES A NEW MODEL THE PAGE WONT REFRESH
  // UNLESS THEY LOG OUT AND BACK IN AGAIN
  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseApiRoute}/api/models/user/${userId}`);
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
    <div className="loading-container">
      <div className="loading-text">Loading Dashboard...</div>
      <div className="loading-spinner">
        <BarLoader loading={isLoading} />
      </div>
    </div>
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='scrolllabel-container'>
      <div className='navbar'>
        <div className='left'>
          <LogoutButton />
        </div>
        <div className='right'>
          <CreateModelButton />
        </div>
      </div>
      <div className='user-page-container'>
        <h1 className='user-page-header'> Hello, {userName}! </h1>
        <h4 className='user-page-sub-header1'> Your Current Models </h4>
        <br></br>
        {models.length > 0 && <h5 className='user-page-sub-header2'> Click one to make some predictions! </h5>}
        {models.length == 0 && <h5 className='user-page-sub-header2'> Looks like you don't have any models. Go ahead and create a new one! </h5>}
        <div>
          <UserSelectButton modelData={models} />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
