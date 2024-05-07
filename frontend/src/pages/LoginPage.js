// src/pages/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.status === 200) {
        // Navigate to the dashboard upon successful login
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo */}
        <img src="/Edulogo.png" alt="EduHub Logo" className="loginlogo" />
     
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Error Message */}
          {error && <p className="error">{error}</p>}
          {/* Submit Button */}
          <button type="submit" className="login-button">Log In</button>
        </form>
        {/* Additional Links */}
        <a href="/forgot-password" className="forgot-password-link">Forgot your username or password?</a>
        <a href="/signup" className="signup-link">Don't have an account? Sign Up</a>
      </div>
    </div>
  );
}

export default LoginPage;
