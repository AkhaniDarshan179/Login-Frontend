import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiCall from "../../service/apiCall";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // const data = await ApiCall("login", "POST", { username, password });

      const response = await ApiCall("login", { username, password });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/employee");
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
};

export default Login;
