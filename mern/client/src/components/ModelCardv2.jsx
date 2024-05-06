import React from 'react';
import './css/ModelCardv2.css';
import { Link } from 'react-router-dom';
import useDeleteModel from '../hooks/useDeleteModel';
import DeleteDataAlert from './DeleteDataalter';
import { useDisclosure } from '@chakra-ui/react'

// This component is just a neat UI element that displays information about a user's model. It takes in modelInfo, which just has a 
// model_name and model_type string and displays it. This card component is present on the user page when they log in.
function ModelCardv2({modelInfo}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let imageUrl;
  
  switch (modelInfo.model_type) {
    case 'NN':
      imageUrl = '/src/assets/image/neural-network-logo.jpg';  // 
      break;
    case 'RF':
      imageUrl = '/src/assets/image/RF-logo.png';  // 
      break;
    case 'SVM':
      imageUrl = '/src/assets/image/SVM-logo.jpg';  //
      break;
    default:
      imageUrl = "https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg"; //
  }

  const { deleteModel, isLoading, error } = useDeleteModel();

  const handleRemove = async () => {
    const success = await deleteModel(modelInfo._id);
    if (success) {
      console.log("Model deleted successfully.");
      window.location.reload();
      // Optionally trigger a refresh or redirect here
    }
  };

  return (
    <div className="card-container">
      {/*A link to the "/useModel" path where a user can use one of their models. The state={{modelInfo}} is essentially passing in a prop to this page but in a different way */}
     <Link to="/useModel" state={{modelInfo}} className="hero-image-container"> 
     <img className="model-image" src={imageUrl} alt="Model representation" />
      </Link>
      <main className="main-content">
        <h1><a>{modelInfo.model_name}</a></h1>
        
      </main>
      <div className="flex-row">
          <div className="coin-base">
            <h2>{modelInfo.model_type}</h2>
          </div>
          <button className="remove-button" onClick={onOpen} disabled={isLoading}>
            {isLoading ? 'Removing...' : 'Remove'}
          </button>
          <DeleteDataAlert Button_info={{ isOpen, onClose }} handleDelete={handleRemove}/>
        </div>
    </div>
  );
}

export default ModelCardv2;