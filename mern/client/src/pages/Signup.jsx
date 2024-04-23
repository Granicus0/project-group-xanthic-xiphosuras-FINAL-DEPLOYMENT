import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import './css/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState(''); // Added state for confirm password
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Check if passwords match
    if(password !== confirmPassword) {
      console.error("Passwords do not match!");
      return; // Stop the submission if passwords do not match
    }
    await signup(email, password)
  }

  return (
    <div className="signup-container"> {/* Added a wrapper for styling */}
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        
        <label htmlFor="email">Email address:</label>
        <input 
          id="email"
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />

        <label htmlFor="password">Password: </label>
        <input 
          id="password"
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />

        <label htmlFor="confirm-password">Confirm Password:</label> {/* Added confirm password field */}
        <input 
          id="confirm-password"
          type="password" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          value={confirmPassword} 
        />

        <button type="submit" className="signup-button">Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup