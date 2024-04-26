import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";
import gsap from "gsap";
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
  const [confirmSignupPassword, setConfirmPassword] = useState(""); // Added state for confirm password
  const [name, setSignupName]= useState("");
  const { signup, error2, isLoading2 } = useSignup();



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
    console.log(isLogin)
    if (isLogin) {

      await login(loginEmail, loginPassword);
    } else {
      if (signupPassword !== confirmSignupPassword) {
        console.error("Passwords do not match!");
        return; // Stop the submission if passwords do not match
      }
      await signup(name, signupEmail, signupPassword);
    }
  };

  useEffect(() => {
    const newStyles_input = {
      outline: "none",
      color: "#4f619e",
      borderBottom: "1px solid #4f619e80",
      transition: "0.5s",
    };

    let log_in = document.getElementById("login");
    let register = document.getElementById("register");
    let formbox = document.getElementsByClassName("form-box")[0];
    let loginbox = document.getElementsByClassName("login-box")[0];
    let registerbox = document.getElementsByClassName("register-box")[0];


    if (isLogin) {
      formbox.style.transform = "translateX(0%)";
      formbox.style.backgroundColor = "#fab2be";
      loginbox.classList.remove("hidden");
      registerbox.classList.add("hidden");
    } else {
      formbox.style.transform = "translateX(80%)"; 
      formbox.style.backgroundColor = "#a5c8fd";
      loginbox.classList.add("hidden");
      registerbox.classList.remove("hidden");
    }

    const input_i = document.getElementsByTagName("input");
    const but_i = document.getElementsByTagName("button");

    register.addEventListener("click", function () {
      isLoginEventListener = false;
      formbox.style.transform = "translateX(80%)";
      formbox.style.backgroundColor = "#a5c8fd";
      Array.from(input_i).forEach((input) => {
        input.addEventListener("focus", () => {
          Object.assign(input.style, newStyles_input);
        });

        input.addEventListener("blur", () => {
          input.style.color = "";
          input.style.borderBottom = "";
        });
      });
      Array.from(but_i).forEach((button) => {
        button.style.borderColor = "#4f619e";
        button.style.color = "#4f619e";
        button.addEventListener("click", () => {
          button.style.backgroundColor = "#4f619e";
          button.style.color = "#fff";
        });
        button.addEventListener("blur", () => {
          button.style.color = "";
        });
        button.addEventListener("mouseenter", () => {
          button.style.backgroundColor = "#4f619e";
          button.style.color = "#fff";
        });
        button.addEventListener("mouseleave", () => {
          button.style.backgroundColor = "";
          button.style.color = "";
        });
      });
      loginbox.classList.add("hidden");
      registerbox.classList.remove("hidden");
    });

    log_in.addEventListener("click", function () {
      formbox.style.transform = "translateX(0%)";
      formbox.style.backgroundColor = "#fab2be";
      Array.from(but_i).forEach((button) => {
        button.style.borderColor = "#9e4f5c";
        button.style.color = "#9e4f5c";
        button.addEventListener("click", () => {
          button.style.backgroundColor = "#9e4f5c";
          button.style.color = "#fff";
        });
        button.addEventListener("blur", () => {
          button.style.color = "";
        });
        button.addEventListener("mouseenter", () => {
          button.style.backgroundColor = "#9e4f5c";
          button.style.color = "#fff";
        });
        button.addEventListener("mouseleave", () => {
          button.style.backgroundColor = "";
          button.style.color = "";
        });
      });
      loginbox.classList.remove("hidden");
      registerbox.classList.add("hidden");
    });
  }, [isLogin]);

  return (
    <div className="loginf">
      <a href="/" className="back_home_link">
        Back to Home
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
            ></input>
            <input
              type="password"
              placeholder="Password:"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            ></input>
            <a href="#" className="reset-password">
              Reset password
            </a>
            <button type="submit" disabled={isLoading}>
              Log in
            </button>
            {error && <div className="error">{error}</div>}
          </form>

          <form className="register-box hidden" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
              type="text"
              placeholder="Name:"
              value={name}
              onChange={(e) => setSignupName(e.target.value)}
            ></input>
            <input
              type="email"
              placeholder="Email:"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Password:"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            ></input>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password:"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmSignupPassword}
            />
            <button type="submit" disabled={isLoading2}>
              Sign up
            </button>
            {error && <div className="error">{error2}</div>}
          </form>
        </div>

        <div className="con-box left">
          <h2>Have account?</h2>
          <img src="src/assets/textures/logo3.png" alt="logo" />
          <button id="login" onClick={() => setIsLogin(true)}>Go to Log in</button>
        </div>
        <div className="con-box right">
          <h2>Do not have account?</h2>
          <img src="src/assets/textures/logo3.png" alt="logo" />
          <button id="register" onClick={() => setIsLogin(false)}>Go to sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
