import React from 'react';
import './css/ModelCardv2.css';
function ModelCardv2({modelInfo}) {
  return (
    <div className="card-container">
      <a className="hero-image-container">
        <img className="hero-image" src="https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg" alt="Spinning glass cube" />
      </a>
      <main className="main-content">
        <h1><a href="#">{modelInfo.model_name}</a></h1>
        <div className="flex-row">
          <div className="coin-base">
            <img src="https://i.postimg.cc/T1F1K0bW/Ethereum.png" alt="Ethereum" className="small-image" />
            <h2>{modelInfo.model_type}</h2>
          </div>
          <div className="time-left">
            <img src="https://i.postimg.cc/prpyV4mH/clock-selection-no-bg.png" alt="clock" className="small-image" />
            <p>3 days left</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ModelCardv2;