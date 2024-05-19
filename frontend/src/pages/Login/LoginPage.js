
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

  
//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post("http://localhost:3000/api/login", { username, password });
//       if (response.status === 200) {
        
//         navigate("/dashboard");
//       } else {
//         setError("Invalid credentials");
//       }
//     } catch (error) {
//       setError("Invalid credentials");
//     }


      
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
       
//         <img src="/Edulogo.png" alt="EduHub Logo" className="loginlogo" />
     
        
//         <form onSubmit={handleLogin}>
//           <div>
//             <label htmlFor="username">Username:</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           {error && <p className="error">{error}</p>}
         
//           <button type="submit" className="login-button">Log In</button>
//         </form>
       
//         <a href="/forgot-password" className="forgot-password-link">Forgot your username or password?</a>
//         <a href="/signup" className="signup-link">Don't have an account? Sign Up</a>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { toast } from "react-toastify";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8090/api/learner/signin", {
        username: username,
        password: password
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);  // Saving the token to localStorage
        toast.success('Account login successfully!');
        navigate("/dashboard");  // Navigate to the dashboard after login
      } else {
        toast.error(response.data.message || 'Login failed.');
        setError("Invalid credentials");  // Set error if credentials are invalid
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occured in when login.');
      setError("Invalid credentials");  // Handle any errors that occur during login
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/Edulogo.png" alt="EduHub Logo" className="loginlogo" />

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

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-button">Log In</button>
        </form>

        <a href="/forgot-password" className="forgot-password-link">Forgot your username or password?</a>
        <a href="/signup" className="signup-link">Don't have an account? Sign Up</a>
      </div>
    </div>
  );
}

export default LoginPage;
