// Example for Allergies.js
import React, { useState, useRef, useEffect } from "react";
import "../../styles/Buttons.css"

function DropdownContent() {
    return (
        <div className="dropdown-content">
            {/* Add your content for the dropdown here */}
            <h3>Group name</h3>
            <h4>Members</h4>
            <ul>
                <li>Member 1</li>
                <li>Member 2</li>
            </ul>
            <h4>Allergies</h4>
            <ul>
                <li>Allergy 1</li>
            </ul>
            <h4>Meals</h4>
            <ul>
                <li>Meal 1</li>
            </ul>
        </div>
    );
}

function Groups() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        // Add click event listener to close dropdown when clicking outside
        document.addEventListener("click", handleClickOutside);

        return () => {
            // Remove the click event listener on component unmount
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

  return (
      <div>
        <section>
          <h2>My Groups</h2>
            <div className={`dropdown ${isDropdownOpen ? 'active' : ''}`} ref={dropdownRef}>
                <button className="buttonStyle" onClick={toggleDropdown}>
                    {isDropdownOpen ? 'Hide Content -' : 'Show Content +'}
                </button>
                <div className="dropdown-content-container">
                    {isDropdownOpen && <DropdownContent />}
                </div>
            </div>
        </section>

        <section>
          <h2>All Groups</h2>
          <p>Content for Section 2 goes here...</p>
        </section>
      </div>
  );
}

export default Groups;
