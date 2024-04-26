import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage'


const App = () => {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/"
            element={<MainPage/>}
          />

          <Route
            path="/user"
            element={<UserPage/>}
          />
        </Routes>
      </BrowserRouter>
    </div>

  );
};
export default App