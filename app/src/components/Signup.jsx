import { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "./components_css/SignupCss.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8050/Admin/signup", {
        username,
        email,
        password,
      });

      const adminId = response.data.userId;
      localStorage.setItem("adminId", adminId);
      console.log("Admin info: ", response.data.userId);
      setSuccessMessage("Admin created successfully!");
      setTimeout(() => {
        navigate("/DashBoard", { replace: true });
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage("Username or Email already exists");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Sign Up</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <button type="submit" className="btn-signup">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
