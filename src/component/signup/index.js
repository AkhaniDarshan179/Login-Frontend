import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    setUserData("");
    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          mobile: userData.mobile,
          email: userData.email,
          password: userData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful");
        navigate("/login");
      } else {
        setError(data.message);
      }

      setUserData({
        username: "",
        mobile: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default SignUp;
