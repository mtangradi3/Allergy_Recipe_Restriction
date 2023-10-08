// UserProfile.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserProfile() {
  // Declared constants
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, email } = location.state || {};

  // CSS formatting of the buttons
  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "20px 0",
    fontSize: "20px",
    margin: "10px 0",
    backgroundColor: "#007BFF", // example color, choose what you like
    color: "white",
    border: "none",
    cursor: "pointer",
  };

    // Logout function
    const handleLogout = () => {
        // Add any additional logout logic here (e.g., clearing local storage, etc.)
        navigate("/"); // Redirect to the login page after logout
    };

  return (
    <div>
      <h2>
        Welcome, {firstName} {lastName}!
      </h2>
      <button
        style={buttonStyle}
        onClick={() => navigate("/user-profile/allergies")}
      >
        Allergies
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/user-profile/groups")}
      >
        Groups
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/user-profile/favorites")}
      >
        Favorites
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/user-profile/meals")}
      >
        Meals
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/user-profile/allmeals")}
      >
        All Meals
      </button>
        {/* Logout button */}
        <button style={buttonStyle} onClick={handleLogout}>
            Logout
        </button>
    </div> // Header title with first name and last name, and made buttons
  );
}

export default UserProfile;
