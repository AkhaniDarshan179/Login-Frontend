import React, { useState } from "react";
import ListEmployee from "./list-employee";

const Employee = () => {
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
      const apiUrl = "http://localhost:8000/api/employee";
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not available");
        return;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        
        console.log("Employee added successfully");
      } else {
        console.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Simbanic Employee Form</h1>
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
