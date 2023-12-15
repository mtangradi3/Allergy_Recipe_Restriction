// UserProfile.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Buttons.css";

function UserProfile() {
  // Declared constants
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, email } = location.state || {};

  return (
    <div>
      <h2>
        Welcome, {firstName} {lastName}!
      </h2>
      <div className="buttonContainer">
        <button
          className="buttonStyle"
          onClick={() =>
            navigate("/user-profile/allergies", {
              state: { firstName, lastName, email },
            })
          }
        >
          Allergies
        </button>
        <button
          className="buttonStyle"
          onClick={() => navigate("/user-profile/groups", { state: { email } })}
        >
          Groups
        </button>
        <button
          className="buttonStyle"
          onClick={() =>
            navigate("/user-profile/favorites", { state: { email } })
          }
        >
          Favorites
        </button>
        <button
          className="buttonStyle"
          onClick={() => navigate("/user-profile/meals", { state: { email, firstName, lastName } })}
        >
          Meals
        </button>
        <button
          className="buttonStyle"
          onClick={() =>
            navigate("/user-profile/allmeals", { state: { email, firstName, lastName } })
          }
        >
          All Meals
        </button>
        <button
          className="buttonStyle"
          onClick={()=>
              navigate("/user-profile/create-meal-based-on-ingredients", { state: { email } })
          }>
          Create Meal Based on Ingredients
        </button>
        {/* Logout button */}
        <button className="buttonStyle" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </div> // Header title with first name and last name, and made buttons
  );
}

export default UserProfile;
