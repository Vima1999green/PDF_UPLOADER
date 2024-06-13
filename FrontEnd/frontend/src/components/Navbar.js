import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        {!token ? (
          <>
            <Link to="/login" className="navbar-button">
              Login
            </Link>
            <Link to="/signUp" className="navbar-button">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="navbar-button logout-button"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
