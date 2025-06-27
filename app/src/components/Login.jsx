import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";
import "./components_css/LoginCss.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/admin/login", {
        email,
        password,
      });

      const adminId = response.data.userId;
      localStorage.setItem("adminId", adminId);
      console.log("Admin info: ", response.data.userId);
      setSuccessMessage("You've been logged in successfully!");
      setTimeout(() => {
        navigate("/DashBoard", { replace: true });
      }, 2000);
    } catch (error) {
      console.log("Error", error.message);
      navigate("/DashBoard", { replace: true });
    }
  };
  console.log({ errorMessage });

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
      <span className="signup-prompt">
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default Login;
