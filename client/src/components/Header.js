/** Author Andy Pham
 *
 *  Contains the login page, create account, and login button
 *   */
import logo from "../logo.svg";
import "../App.css";
import { API_TEST, GET_ALL_USERS } from "../utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getAllUsers } from "../api/userAPI";

/* Form for the user to fill out including first name, last name, and email address */
function UserForm() {
  const navigate = useNavigate();

  // New state to track the action ('login' or 'register')
  const [action, setAction] = useState("");

  // State variables to store user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // Add this to manage error messages

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate if the fields are not left empty
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("All fields are required.");
      return; // Exit the function if validation fails
    }

    // Depending on what button is clicked, go to the specific function to handle it
    if (action === "login") {
      handleLogin();
    } else if (action === "register") {
      handleCreateAccount();
    }
  };

  // Function to handle login user
  // Modified handleLogin function to validate the user
  const handleLogin = async () => {
    try {
      const allUsers = await getAllUsers();
      const emailLower = email.toLowerCase(); // Convert input email to lowercase
      const emailExists = allUsers.some(
        (user) => user.email.toLowerCase() === emailLower,
      );

      if (emailExists) {
        setError(""); // Clear the error message if there's any from previous attempts
        navigate("/user-profile", { state: { firstName, lastName, email } });
      } else {
        setError("No user registered with this email."); // Set the error message if email doesn't exist
      }
    } catch (err) {
      console.error("Error while checking users:", err.message);
      setError("There was an issue checking users. Please try again."); // Generic error message for user
    }
  };

  // Function to handle create user
  const handleCreateAccount = async () => {
    try {
      const allUsers = await getAllUsers();
      const emailLower = email.toLowerCase(); // Convert input email to lowercase
      const emailExists = allUsers.some(
        (user) => user.email.toLowerCase() === emailLower,
      );

      if (emailExists) {
        setError("An account with this email already exists.");
      } else {
        try {
          await handleCreateUser(); // This will create the user
          navigate("/user-profile", { state: { firstName, lastName, email } });
        } catch (error) {
          setError("Error creating user. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error while checking users:", err.message);
      setError("There was an issue checking users. Please try again."); // Generic error message for user
    }
  };

  const handleCreateUser = async () => {
    console.log("hit");
    try {
      const data = await createUser(firstName, lastName, email);
      console.log(data);
      // Handle success
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response ? error.response.data : error.message,
      );
      // Handle error
    }
  };

  const handleAllUsers = async () => {
    console.log("hit");
    try {
      const data = await getAllUsers();
      console.log(data);
      // Handle success
    } catch (error) {
      console.error(
        "Error",
        error.response ? error.response.data : error.message,
      );
      // Handle error
    }
  };

  return (
    // Determines what happens when you hit submit
    // Determines what the firstName, lastName, and email field do and their behaviors
    <form onSubmit={handleFormSubmit}>
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
          onChange={(e) => setEmail(e.target.value.toLowerCase())} // Convert input to lowercase
        />
      </div>
      <input type="hidden" value={action} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" onClick={() => setAction("register")}>
        Create Account
      </button>
      <button type="submit" onClick={() => setAction("login")}>
        Login
      </button>
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
