// Example for Allergies.js
import React, { useState, useRef, useEffect } from "react";
import "../../styles/Buttons.css"

function DropdownContent() {
    return (
        <div className="dropdown-content">
            {/* Add your content for the dropdown here */}
            <p>Information 1</p>
            <p>Information 2</p>
            <p>Information 3</p>
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
                    {isDropdownOpen ? 'Hide Content' : 'Show Content'}
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
