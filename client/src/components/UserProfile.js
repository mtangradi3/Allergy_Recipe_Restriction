/** Author Andy Pham
 *
 * Contains the user profile information with allergies,
 *   groups, favorites, meals, all meals, and logout.
 *   Routes to different pages upon clicking the buttons.
 *   */
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
          onClick={() => navigate("/user-profile/allergies")}
        >
          Allergies
        </button>
        <button
          className="buttonStyle"
          onClick={() => navigate("/user-profile/groups")}
        >
          Groups
        </button>
        <button
          className="buttonStyle"
          onClick={() => navigate("/user-profile/favorites")}
        >
          Favorites
        </button>
        <button
          className="buttonStyle"
          onClick={() => navigate("/user-profile/meals")}
        >
          Meals
        </button>
        <button
          className="buttonStyle"
          onClick={() => navigate("/user-profile/allmeals")}
        >
          All Meals
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
