import React from "react";
import ReactDOM from "react-dom/client"; // Note the change in import
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optionally log performance metrics
reportWebVitals();
