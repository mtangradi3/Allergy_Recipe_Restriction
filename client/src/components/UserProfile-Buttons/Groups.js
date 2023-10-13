import React, { useState, useRef, useEffect } from "react";
import "../../styles/Buttons.css";

// The button used to open a pop-up that will allow the user to create or add themselves to a group.
function CreateOrJoinGroup() {
    const handleClick = () => {
        // Add your click handling logic here
        console.log("Button clicked!");
    };

    return (
        <div className="circle-button" onClick={handleClick}>+</div>
    );
}

// The content of each dropdown button
function DropdownContent() {
    return (
        <div className="dropdown-content">
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

// The logic for each Dropdown button
function DropdownButton({ buttonText }) {
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
        <div className={`dropdown ${isDropdownOpen ? 'active' : ''}`} ref={dropdownRef}>
            <button className="buttonStyle" onClick={toggleDropdown}>
                {/* Change this to change the labels on the buttons */}
                {buttonText} {isDropdownOpen ? '-' : '+'}
            </button>
            <div className="dropdown-content-container">
                {isDropdownOpen && <DropdownContent />}
            </div>
        </div>
    );
}

// The actual display of the buttons
function Groups() {
    return (
        <div>
            <CreateOrJoinGroup />
            <br/>
            <div>
                <h2>My Groups</h2>
                <DropdownButton buttonText="Dropdown 1" />
                <DropdownButton buttonText="Dropdown 2" />
            </div>
            <div>
                <h2>All Groups</h2>
                <DropdownButton buttonText="Dropdown 1" />
                <DropdownButton buttonText="Dropdown 2" />
            </div>
            {/* Add more DropdownButtons as needed */}
        </div>
    );
}

export default Groups;