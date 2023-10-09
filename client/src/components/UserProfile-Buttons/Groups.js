// Example for Allergies.js
import React, { useState } from "react";
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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

  return (
      <div>
        <section>
          <h2>My Groups</h2>
            <div className={`dropdown ${isDropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
                <button className="buttonStyle">
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
