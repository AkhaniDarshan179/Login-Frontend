import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleSignUpClick}>SignUp</button>
    </div>
  );
};

export default Home;
