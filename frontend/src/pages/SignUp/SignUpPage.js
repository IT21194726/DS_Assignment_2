// src/pages/SignUpPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/signup", { username, password, email });
      if (response.status === 201) {
        // Navigate to the login page upon successful sign-up
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Logo */}
        <img src="/Edulogo.png" alt="EduHub Logo" className="signuplogo" />
      
        {/* Sign-Up Form */}
        <form onSubmit={handleSignUp}>
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
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Error Message */}
          {error && <p className="error">{error}</p>}
          {/* Submit Button */}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        {/* Additional Link */}
        <a href="/login" className="login-link">Already have an account? Log In</a>
      </div>
    </div>
  );
}

export default SignUpPage;
