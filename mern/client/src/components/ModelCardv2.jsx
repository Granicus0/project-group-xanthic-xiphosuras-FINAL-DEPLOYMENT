import React from 'react';
import './css/ModelCardv2.css';
import { Link } from 'react-router-dom';

// This component is just a neat UI element that displays information about a user's model. It takes in modelInfo, which just has a 
// model_name and model_type string and displays it. This card component is present on the user page when they log in.
function ModelCardv2({modelInfo}) {
  return (
    <div className="card-container">
      {/*A link to the "/useModel" path where a user can use one of their models. The state={{modelInfo}} is essentially passing in a prop to this page but in a different way */}
     <Link to="/useModel" state={{modelInfo}} className="hero-image-container"> 
        <img className="hero-image" src="https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg" alt="Spinning glass cube" />
      </Link>
      <main className="main-content">
        <h1><a>{modelInfo.model_name}</a></h1>
        <div className="flex-row">
          <div className="coin-base">
            <h2>{modelInfo.model_type}</h2>
          </div>
          <div className="time-left">
            <p>3 days left</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ModelCardv2;