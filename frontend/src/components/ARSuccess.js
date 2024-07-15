// frontend/src/components/ARSuccess.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ARSuccess = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/markerbased");
  };

  return (
    <div className="ar-success">
      <h2>Submission Successful!</h2>
      <p>Your AR form has been submitted successfully.</p>
      <button type="button" className="btn btn-success" onClick={handleSubmit}>
        MarkerBased
      </button>
    </div>
  );
};

export default ARSuccess;
