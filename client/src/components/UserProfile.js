// UserProfile.js
import React from "react";
import { useLocation } from "react-router-dom";

function UserProfile() {
  // Declared constants
  const location = useLocation();
  const { firstName, lastName } = location.state || {};

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

  return (
    <div>
      <h2>
        Welcome, {firstName} {lastName}!
      </h2>
      <button style={buttonStyle} onClick={() => alert("Button 1 clicked!")}>
        Allergies
      </button>
      <button style={buttonStyle} onClick={() => alert("Button 2 clicked!")}>
        Groups
      </button>
      <button style={buttonStyle} onClick={() => alert("Button 3 clicked!")}>
        Favorites
      </button>
      <button style={buttonStyle} onClick={() => alert("Button 4 clicked!")}>
        Meals
      </button>
    </div> // Header title with first name and last name, and made buttons
  );
}

export default UserProfile;
