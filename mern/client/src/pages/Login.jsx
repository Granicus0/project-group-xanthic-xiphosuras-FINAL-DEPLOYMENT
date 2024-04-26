import { useState } from "react"
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import './css/Login.css';
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem('user');
      if (token) {
        navigate('/user');
      }
    }

    checkLoggedIn();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="login-container"> {/*Alina*/}
      <form className="login" onSubmit={handleSubmit}>
        <h3>Welcome</h3>

        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Passwork"
        />
        <div className="actions">
          <a href="#" className="reset-passwork">Reset password</a>
          <button type="submit" className="login-button">Log in</button>
        </div>

        {error && <div className="error">{error}</div>}
        <div className="register-link">
          No account? <a href="#" className="create-one">Create one</a>
        </div>
      </form>

    </div>
  )
}

export default Login