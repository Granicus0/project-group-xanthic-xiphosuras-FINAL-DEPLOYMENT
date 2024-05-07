import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import UserPage from './pages/userPage/UserPage.jsx';
import LoginSignupPage from './pages/loginSignupPage/LoginSignupPage.jsx';
import MakeModel from './pages/makeModelPage/MakeModel';
import UseModel from './pages/useModelPage/useModelPage.jsx';
import ModelProgress from './pages/modelProgressPage/ModelProgress.jsx';
import ModelPredict from './pages/modelPredictPage/ModelPredict';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/user" element={<UserPage />} />
          <Route path="/register" element={<LoginSignupPage />} />
          <Route path="/makeModel" element={<MakeModel />} />
          <Route path="/useModel" element={<UseModel />} />
          <Route path="/modelProgress" element={<ModelProgress />} />
          <Route path="/modelPredict" element={<ModelPredict />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
