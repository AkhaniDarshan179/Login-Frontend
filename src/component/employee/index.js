import React, { useState } from "react";
import ListEmployee from "./list-employee";
import { useNavigate } from "react-router-dom";
import ApiCall from "../../service/apiCall";

const Employee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    experience: "",
    language: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    // e.preventDefault();

    try {
      // const apiUrl = "http://localhost:8000/api/employee";
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("Token not available");
        return;
      }

      const data = await ApiCall("employees", formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div>
      <h1>Simbanic Employee Form</h1>
      <br />
      <div style={{ position: "absolute", top: 5, right: 0 }}>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <br />
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Experience:
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
          />
        </label>

        <br />
        <button type="submit">Add Employee</button>

        <ListEmployee />
      </form>
    </div>
  );
};

export default Employee;
