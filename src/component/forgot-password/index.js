import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleForgot = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        // const data = await response.json();
        // localStorage.setItem("token", data.token);
        // navigate("/change-password");
      } else {
        setError(data.message);
      }

      // setMobile("");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, code }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/change-password/${mobile}`);
        console.log("OTP matched");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form>
        <label>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleForgot}>
          Send SMS
        </button>
        <br />
        <br />
        <label>
          Code:
          <input
            type="text"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleVerify}>
          Verify Code
        </button>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
