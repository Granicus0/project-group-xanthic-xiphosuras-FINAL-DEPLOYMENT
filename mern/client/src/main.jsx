import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ModelProgressContextProvider } from "./context/ModelProgressContext";
import { ModelPredictionContextProvider } from "./context/ModelPredictionContext";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <ModelPredictionContextProvider>
      <ModelProgressContextProvider>
        
          <App />
        
      </ModelProgressContextProvider>
      </ModelPredictionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);