import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    console.log("call");

    localStorage.removeItem("authToken");
    console.log("Logged out. Token removed from local storage.");
    navigate("/login");
  };

  return (
    <nav>
      <ul style={{ listStyleType: "none", display: "flex", padding: 0 }}>
        <li style={{ marginRight: "20px" }}>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li style={{ marginLeft: "auto" }}>
          {" "}
          {/* Pushes the logout button to the right */}
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
