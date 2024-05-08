import React from 'react';
import MainPageBackgroundAnimation from './MainPageBackgroundAnimation';
import './MainPage.css';

const MainPage = () => {
  const assetsFolder = import.meta.env.VITE_ASSETS_FOLDER;

  return (
    <>
      <MainPageBackgroundAnimation assetsFolder={assetsFolder} />
      <nav>
         <a href="/" className="toptitle">ArgusML</a>
        <ul>
          <li>
            <a className="login_button" href='/register'>Log in</a>
          </li>
          <li>
            <a className="sign_button" href="/register">Sign up</a>
          </li>
        </ul>
      </nav>
      <button className="return_button"> Back to Home Page</button>
      <h1 className="title1">Empower Your Data</h1>
      <h1 className="title2">Train Smarter, Not Harder</h1>
      <div className="about-description-container" style={{ maxHeight: '100px' }}>
        <h1 className="about-description-header">Welcome to ArgusML</h1>

      </div>
      <div className="about-description-container">
        <p className="about-description">

          Machine learning can be hard. We understand that. Jargon like PyTorch, TensorFlow, SVM, MLP, Neural Networks, CSV Schemas, LLM, LAM,
          GPU Acceleration — YUCK!

        </p>
        <br></br>
        <p className="about-description">
          ArgusML makes it easy. Want to predict something? Just upload your dataset, choose a model, and be done with it. No need to learn machine learning theory,
          statistics, or even a programming language.
        </p>
        <br></br>
        <p className="about-description">
          To get started, create an account, and instantly start training your own models.
          <br></br>
          <br></br>
          Happy (machine) learning!
        </p>

      </div>

      <button className="start_button">About This Site</button>

    </>
  )
};

export default MainPage;

