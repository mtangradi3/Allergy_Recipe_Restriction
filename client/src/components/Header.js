import logo from "../logo.svg";
import "../App.css";
import { API_TEST } from "../utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { openPopup } from "./UserProfile";

/* Form for the user to fill out including first name, last name, and email address */
function UserForm() {
  // State variables to store user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Open a pop-up window after form submission
    const userProfilePopUpContent = `<h2>Welcome ${firstName} ${lastName}</h2>`;

    // Open a pop-up window for the user profile
    openPopup(userProfilePopUpContent);
  };

  return (
    // Send data to server below this comment to be added later

    // Determines what happens when you hit submit
    // So far it is only console logging the information
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

/* Creates a window. The customization of the window is in App.css */
function Window() {
  return (
    <div className="window">
      <div className="window-header">
        <span className="window-title">Allergy Recipe Portal</span>
        <button className="window-close-button">X</button>
      </div>
      <div className="window-content">
        {/* Your content goes here*/}
        <p>User Registration</p>
        <UserForm />
      </div>
    </div>
  );
}

// Exports the function to be used in App.js
export default Window;
