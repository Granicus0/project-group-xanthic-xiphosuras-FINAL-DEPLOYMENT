import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from './pages/main_page/MainPage';
import UserPage from './pages/user_page/UserPage';
import Log_signin from './pages/login_page/Login_sign';


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

          <Route
            path="/register"
            element={<Log_signin/>}
          />
        </Routes>
      </BrowserRouter>
    </div>

  );
};
export default App