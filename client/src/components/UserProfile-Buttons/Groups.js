import React, { useState, useRef, useEffect } from "react";
import "../../styles/Buttons.css";
import { getAllGroups, createGroup, addUserToGroup, getUsersInGroup, getGroupNames } from "../../api/groupAPI";
import { useLocation } from "react-router-dom";

import {create} from "axios";

// The button used to open a pop-up that will allow the user to create or add themselves to a group.
function CreateOrJoinGroup() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [selectedGroup, setSelectedGroup] = useState(""); // For the dropdown selection
    const [errorMessage, setErrorMessage] = useState("");
    const [activeTab, setActiveTab] = useState("create");

    // Getting email from state
    const location = useLocation();
    const { email } = location.state || {};

    const [allGroups, setAllGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groups = await getAllGroups();
                setAllGroups(groups);
            } catch (error) {
                console.error("Error with getting all groups");
                // Handle error fetching groups
            }
        };

        // Call the fetchGroups function
        fetchGroups();
    }, []); // Empty dependency array to run the effect only once on mount

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setUserInput("");
        setSelectedGroup("");
        setErrorMessage("");
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // BEGIN "create" tab
        if (activeTab === "create") {
            if (!userInput.trim()) {
                setErrorMessage("Please enter valid information.");
                return;
            }

            try {
                // Check if the group already exists
                const existingGroup = allGroups.includes(userInput);

                if (existingGroup) {
                    // Group already exists, show an error message
                    setErrorMessage("Group name already exists. Please choose a different name.");
                    return; // Prevent pop-up from being closed
                } else {
                    // Group doesn't exist, proceed with creating the group
                    try {
                        const response = await createGroup(userInput);
                        // console.log("API Response (createGroup):", response);
                        // Group created successfully

                        try {
                            await addUserToGroup(email, userInput);
                            // console.log("response2", response2);
                            // alert(`Group created and user added: ${userInput}`);
                            // closePopup();
                            alert("Successfully added you to your newly created group!"); // Let user know
                        }
                        catch (error) {
                            // DELETE GROUP OPTION HERE
                            setErrorMessage("Error adding user to newly created group. Group not created.");
                            return;
                        }
                    }
                    catch (error) {
                        console.error("API Error:", error);
                        setErrorMessage("Error creating group. Please try again.");
                        return;
                    }
                }
            } catch (error) {
                console.error("API Error:", error);
                setErrorMessage("Error checking group existence. Please try again.");
                return;
            }

        // BEGIN "join" tab
        } else if (activeTab === "join") {
            if (!selectedGroup) {
                setErrorMessage("Please select a group.");
                return;
            }

            try {
                // console.log(email);
                const response = await addUserToGroup(email, selectedGroup);
                // console.log("addUserToGroup: ", response);
                alert("Successfully added you to the group!");
            }
            catch (error) {
                setErrorMessage("Error adding user to group.");
                return;
            }
        }

        closePopup();
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="circle-button" onClick={openPopup}>
                +
            </div>

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <div>
                            <button
                                className={activeTab === "create" ? "active-tab" : ""}
                                onClick={() => switchTab("create")}
                            >
                                Create a Group
                            </button>
                            <button
                                className={activeTab === "join" ? "active-tab" : ""}
                                onClick={() => switchTab("join")}
                            >
                                Join a Group
                            </button>
                        </div>
                        <p>
                            {activeTab === "create"
                                ? "Please enter a group name to create one."
                                : "Please select a group to join."}
                        </p>
                        <form onSubmit={handleFormSubmit}>
                            {activeTab === "create" ? (
                                <label>
                                    <input
                                        type="text"
                                        name="userInput"
                                        value={userInput}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            ) : (
                                <label>
                                    <select value={selectedGroup} onChange={handleSelectChange}>
                                        <option value="">Select a group</option>
                                        {/* Map over the groups fetched from the API to create options */}
                                        {allGroups.map((group) => (
                                            <option key={group} value={group}>
                                                {group}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            )}
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            <br />
                            <button type="submit">Submit</button>
                            <button type="button" onClick={closePopup}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
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
    const [allGroups, setAllGroups] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const location = useLocation();
    const { email } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const groups = await getGroupNames();
                setAllGroups(groups);
                console.log("epic:", groups);
            } catch (error) {
                // console.error("Error fetching all groups", error);
                alert("Error fetching all groups.");
                setLoading(false); // Set loading to false in case of an error
            }
        };

        const filterGroups = async () => {
            try {
                const newGroups = [];

                // for each group, get users
                for(let i = 0; i < allGroups.length; i++) {
                    const group = allGroups[i];
                    const usersInGroup = await getUsersInGroup(group);

                    // match emails with groups
                    if(usersInGroup.some((user) => user.email === email)) {
                        newGroups.push(group);
                    }
                }

                setUserGroups(newGroups);
                setLoading(false); // Set loading to false in case of an error
            }
            catch(error) {
                // console.log("Error filtering groups", error);
                alert("Error filtering groups");
                setLoading(false); // Set loading to false in case of an error
            }
        }

        if (!allGroups.length) {
            // If allGroups is empty, fetch the data
            fetchData();
        } else {
            // If allGroups has data, filter the groups
            filterGroups();
        }
    }, [allGroups, email]);

    return (
        <div>
            <CreateOrJoinGroup />
            <br/>
            <div>
                <h2>My Groups</h2>
                {loading ? ( // Render a loading indicator if loading is true
                    <p>Loading...</p>
                ) : (
                    userGroups.map((group, index) => (
                        <DropdownButton key={index} buttonText={group} />
                    ))
                )}
            </div>
            {/* Add more DropdownButtons as needed */}
        </div>
    );
}

export default Groups;