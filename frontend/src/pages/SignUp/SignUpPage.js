
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import { toast } from 'react-toastify';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const signupData = {
      learnerId: 0,
      username,
      password,
      email,
      firstName,
      lastName,
      phone,
      address,
      city,
      country,
      signupRequest: {
        username: username,
        email: email,
        password: password,
        roles: ['admin'] // Assuming 'ROLE_USER' as a default role; adjust as necessary
      }
    };
    try {
      const response = await axios.post('http://localhost:8090/api/learner', signupData);
      if (response.data.status === 'CREATED') {
        toast.success('Account created successfully!');
        navigate('/login'); // Or wherever you'd like to redirect on success
      } else {
        toast.error(response.data.message || 'Registration failed.');
        setError(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to sign up.');
      setError('Failed to sign up.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <img src="/Edulogo.png" alt="EduHub Logo" className="signuplogo" />
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
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <a href="/login" className="login-link">Already have an account? Log In</a>
      </div>
    </div>
  );
}

export default SignUpPage;
