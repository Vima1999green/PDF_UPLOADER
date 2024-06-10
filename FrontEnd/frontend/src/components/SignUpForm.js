import React, { useState } from "react";
import axios from "axios";
import "../styles/SignUpForm.css";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
    };

    axios
      .post("http://localhost:5000/api/users/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("sign up Successful");
        } else {
          alert(`Sign up failed: ${response.data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error", error);
        alert("An Error occured.Please try again");
      });
  };

  return (
    <div className="signupform-container">
      <div className="header-container">
        <h2>SignUp Form</h2>
      </div>
      <div className="field-container">
        <div className="name-container">
          <label>Name</label>
          <input
            placeholder="your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="email-container">
          <label>Email</label>
          <input
            placeholder="your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password-container">
          <label>Password</label>
          <input
            placeholder="add passoword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="password-container">
          <label>Confirm Password</label>
          <input
            placeholder="re-enter your password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
        <button>Reset</button>
      </div>
    </div>
  );
}

export default SignUpForm;
