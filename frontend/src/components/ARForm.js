// frontend/src/components/ARForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ARForm = ({ type, onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [logo, setLogo] = useState(null);
  const [video, setVideo] = useState(null);

  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", type);
    formData.append("companyName", companyName);
    formData.append("purpose", purpose);
    formData.append("logo", logo);
    formData.append("video", video);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/arforms/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/arsuccess");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="ar-form">
      <h2>{type} Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Purpose: </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          >
            <option value="">Select purpose</option>
            <option value="marketing">Marketing</option>
            <option value="training">Training</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <div>
          <label>Logo Upload:</label>
          <input type="file" onChange={handleLogoChange} required />
        </div>
        <div>
          <label>Video Upload:</label>
          <input type="file" onChange={handleVideoChange} required />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ARForm;
