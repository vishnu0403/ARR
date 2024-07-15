// frontend/src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import ARForm from "./components/ARForm";
import ARSuccess from "./components/ARSuccess";
import "./App.css"; // Assuming you have a separate CSS file for styles

function App() {
  const [isAuthenticated, setAuth] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogin = () => {
    setAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/auth");
  };

  return (
    <div className="App">
      <Navigation
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="/auth" element={<Auth setAuth={handleLogin} />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/arform"
          element={<ARForm type="AR" onClose={() => {}} />}
        />
        <Route path="/arsuccess" element={<ARSuccess />} />
      </Routes>
    </div>
  );
}

function Navigation({ isAuthenticated, handleLogout }) {
  const location = useLocation();

  // Don't render the navigation if the current path is /auth
  if (location.pathname === "/auth") return null;

  return (
    <nav className="navbar">
      <ul className="nav-left">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <ul className="nav-right">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
