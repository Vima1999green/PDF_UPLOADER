import React, { useState } from "react";
import axios from "axios";
import "../styles/SignUpForm.css";
import { Link, useNavigate } from "react-router-dom";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
      confirmPassword,
    };

    axios
      .post("http://localhost:5000/api/users/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Sign up successful");

          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setErrors({});
          navigate("/login");
        } else {
          alert(`Sign up failed: ${response.data.message}`);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
        console.error("Error", error);
      });
  };

  return (
    <div className="signupform-container">
      <div className="header-container">
        <h2>Sign Up Form</h2>
      </div>
      <div className="field-container">
        <div className="name-container">
          <label>Name</label>
          <input
            placeholder="Your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="email-container">
          <label>Email</label>
          <input
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="password-container">
          <label>Password</label>
          <input
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="password-container">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
        <button
          onClick={() => {
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setErrors({});
          }}
        >
          Reset
        </button>
      </div>
      <Link to="/login">
        If you already have an account.Click here to Login
      </Link>
    </div>
  );
}

export default SignUpForm;
