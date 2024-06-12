import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    axios
      .post("http://localhost:5000/api/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setErrors({});
          alert("Login successful");

          localStorage.setItem("jwtToken", response.data.token);
          navigate("/uploadPdf");
        } else alert(`login failed : ${response.data.messege}`);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className="login-container">
      <div className="header-container">
        <h2>Login Form</h2>
      </div>
      <div className="field-container">
        <div className="email-container">
          <label>Email</label>
          <input
            placeholder="email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="password-container">
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="button-container">
          <button onClick={handleLogin}>Login</button>
          <button
            onClick={(e) => {
              setEmail("");
              setPassword("");
              setErrors({});
            }}
          >
            Reset
          </button>
        </div>

        {errors.msg && <span className="error-message">{errors.msg}</span>}
      </div>
      <Link to="/signUp">Click here to Create an Account</Link>
    </div>
  );
}

export default LoginForm;
