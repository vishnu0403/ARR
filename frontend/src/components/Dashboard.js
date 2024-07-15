// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ARForm from "./ARForm";

const Dashboard = ({ setAuth }) => {
  const [user, setUser] = useState(null);
  const [formType, setFormType] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuth(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error(
          "Fetch user error:",
          error.response ? error.response.data : error.message
        );
        setAuth(false);
      }
    };

    fetchUser();
  }, [setAuth]);

  if (!user) return <div>Loading...</div>;

  const handleButtonClick = (type) => {
    setFormType(type);
  };

  const handleCloseForm = () => {
    setFormType("");
  };

  return (
    <div className="dashboard">
      <h1>
        <p>Welcome, {user.name}</p>
      </h1>
      <p>AR-Types:</p>
      <button onClick={() => handleButtonClick("Marker Based")}>
        Marker Based
      </button>
      <button onClick={() => handleButtonClick("Image Tracking")}>
        Image Tracking
      </button>
      <button onClick={() => handleButtonClick("Location Based")}>
        Location Based
      </button>

      {formType && <ARForm type={formType} onClose={handleCloseForm} />}
    </div>
  );
};

export default Dashboard;
