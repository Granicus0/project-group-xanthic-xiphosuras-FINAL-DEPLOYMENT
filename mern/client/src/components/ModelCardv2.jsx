import React from 'react';
import './css/ModelCardv2.css';
import { Link } from 'react-router-dom';

function ModelCardv2({modelInfo}) {
  return (
    <div className="card-container">
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