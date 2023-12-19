import "./App.css";
import React from "react";
import Home from "./component/home";
import Login from "./component/login";
import SignUp from "./component/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employee from "./component/employee";
import ForgotPassword from "./component/forgot-password";
import ChangePassword from "./component/change-password";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password/:mobile" element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
