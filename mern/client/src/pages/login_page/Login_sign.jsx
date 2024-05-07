import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import "./Login_sign.css";
import { useLocation } from 'react-router-dom';

const LoginSignup = () => {

  const location = useLocation();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  
  const initialMode = location.state?.mode;
  const [isLogin, setIsLogin] = useState(initialMode === 'signup' ? false : true); 
  const navigate = useNavigate();

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmSignupPassword, setConfirmPassword] = useState(""); 
  const [name, setSignupName]= useState("");
  const { signup, isSignupLoading, signupError } = useSignup();

  const logoImagePath = import.meta.env.VITE_ASSETS_FOLDER + '/textures/logo3.png'

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("user");
      if (token) {
        navigate("/user");
      }
    };
    checkLoggedIn();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(loginEmail, loginPassword);
    } else {
      await signup(name, signupEmail, signupPassword, confirmSignupPassword);
    }
  };

  useEffect(() => {
    let log_in = document.getElementById("login");
    let register = document.getElementById("register");
    let formbox = document.getElementsByClassName("form-box")[0];
    let loginbox = document.getElementsByClassName("login-box")[0];
    let registerbox = document.getElementsByClassName("register-box")[0];
  
    if (isLogin) {
      formbox.style.transform = "translateX(0%)";
      loginbox.classList.remove("hidden");
      registerbox.classList.add("hidden");
    } else {
      formbox.style.transform = "translateX(80%)";
      loginbox.classList.add("hidden");
      registerbox.classList.remove("hidden");
    }
  
    register.addEventListener("click", function () {
      formbox.style.transform = "translateX(80%)";
      loginbox.classList.add("hidden");
      registerbox.classList.remove("hidden");
    });
  
    log_in.addEventListener("click", function () {
      formbox.style.transform = "translateX(0%)";
      loginbox.classList.remove("hidden");
      registerbox.classList.add("hidden");
    });
  }, [isLogin]);
  

  return (
    <div className="loginf">
      <a href="/" className="back_home_link" >
        Back to main page
      </a>
      <div className="container">
        <div className="form-box">
          <form className="login-box" onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <input
              type="email"
              placeholder="Email:"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="login-sign-input"
            ></input>
            <input
              type="password"
              placeholder="Password:"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="login-sign-input"
            ></input>
            
            <button type="submit" className="login-button" disabled={isLoading}>
              Log in
            </button>
            <br></br>
            {error && <div className="error" style={{color: "red"}}>{error} </div>}
          </form>

          <form className="register-box hidden" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
              type="text"
              placeholder="Name:"
              value={name}
              onChange={(e) => setSignupName(e.target.value)}
              className="login-sign-input"
            ></input>
            <input
              type="email"
              placeholder="Email:"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="login-sign-input"
            ></input>
            <input
              type="password"
              placeholder="Password:"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="login-sign-input"
            ></input>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password:"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmSignupPassword}
              className="login-sign-input"
            />
            <button type="submit" className="register-button" disabled={isSignupLoading}>
              Sign up
            </button>
            <br></br>
            {signupError && <div className="error" style={{color: "red"}}>{signupError}</div>}
          </form>
        </div>

        <div className="con-box left">
          <h2>Have account?</h2>
          <img src={logoImagePath} alt="logo" />
          <button id="login" className = "go-to-login-button" onClick={() => setIsLogin(true)}>Go to Log in</button>
        </div>
        <div className="con-box right">
          <h2>Do not have account?</h2>
          <img src={logoImagePath} alt="logo" />
          <button id="register" className = "go-to-signup-button" onClick={() => setIsLogin(false)}>Go to sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
