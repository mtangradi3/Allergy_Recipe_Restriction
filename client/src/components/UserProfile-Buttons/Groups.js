import React, { useState, useRef, useEffect } from "react";
import "../../styles/Buttons.css";
import {
  getAllGroups,
  createGroup,
  addUserToGroup,
  getUsersInGroup,
  getGroupNames,
  getFoodsForGroup,
  deleteGroup,
  removeUserFromGroup,
  getGroupAllergies,
} from "../../api/groupAPI";
import { useLocation } from "react-router-dom";

import { all, create } from "axios";

// The button used to open a pop-up that will allow the user to create or add themselves to a group.
function CreateOrJoinGroup({ userGroups }) {
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
          setErrorMessage(
            "Group name already exists. Please choose a different name.",
          );
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
            } catch (error) {
              // DELETE GROUP OPTION HERE
              setErrorMessage(
                "Error adding user to newly created group. Group not created.",
              );
              return;
            }
          } catch (error) {
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

      // Check if the user is already in the selected group
      const isUserInGroup = userGroups.includes(selectedGroup);
      // console.log("allGroups", allGroups);

      if (isUserInGroup) {
        setErrorMessage("You are already a member of this group.");
        return;
      }

      try {
        // console.log(email);
        const response = await addUserToGroup(email, selectedGroup);
        // console.log("addUserToGroup: ", response);
        alert("Successfully added you to the group!");
        window.location.reload();
      } catch (error) {
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
                //   join
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
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <br />
              <button type="submit">Submit</button>
              <button type="button" onClick={closePopup}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// The content of each dropdown button
function DropdownContent({
  groupMembers,
  groupFoods,
  groupAllergies,
  groupName,
  onDeleteGroup,
  onLeaveGroup,
}) {
  // useEffect(() => {
  //   console.log("content groupmembers", groupMembers);
  // }, []);

  const handleDeleteClick = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this group? This deletes the group entirely.",
      )
    ) {
      // Call the onDeleteGroup function when the user confirms the deletion
      onDeleteGroup(groupName);
    }
  };

  const handleLeaveClick = () => {
    if (window.confirm("Are you sure you want to leave this group?")) {
      // Call the onLeaveGroup function when the user confirms leaving the group
      onLeaveGroup(groupName);
      alert("Removed you from " + groupName);
      window.location.reload();
    }
  };

  return (
    <div className="dropdown-content">
      <h4>Members</h4>
      <ul>
        {groupMembers.map((member, index) => (
          <li key={index}>
            {member.first_name} {member.last_name} - {member.email}
          </li>
        ))}
      </ul>
      <h4>Allergies</h4>
      <ul>
        {groupAllergies.map((allergy, index) => (
          <li key={index}>{allergy}</li>
        ))}
      </ul>
      <h4>Meals</h4>
      <ul>
        {groupFoods.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>
      <button onClick={handleLeaveClick} className="leave-button orange">
        Leave Group
      </button>
      <button onClick={handleDeleteClick} className="delete-button red">
        Delete Group
      </button>
    </div>
  );
}

// The logic for each Dropdown button
function DropdownButton({ buttonText, onDeleteGroup, onLeaveGroup }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupFoods, setGroupFoods] = useState([]);
  const [groupAllergies, setGroupAllergies] = useState([]);

  const location = useLocation();
  const { email } = location.state || {};

  const toggleDropdown = () => {
    const newState = !isDropdownOpen;
    setIsDropdownOpen(newState);

    if (newState === true && (!groupMembers.length || !groupFoods.length)) {
      // console.log("Attempting to fetch data");
      fetchGroupData(buttonText);
    }
  };

  const fetchGroupData = async (groupName) => {
    try {
      // set group members to null first
      setGroupMembers(null);
      const groupMembersResponse = await getUsersInGroup(groupName);
      // console.log("Group members from API:", groupMembersResponse);
      setGroupMembers(groupMembersResponse);

      const groupFoods = await getFoodsForGroup(groupName);
      setGroupFoods(groupFoods);

      const allergies = await getGroupAllergies(groupName);
      setGroupAllergies(allergies);
    } catch (error) {
      console.error("Error fetching group data", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleLeaveGroup = async (groupName) => {
    try {
      await removeUserFromGroup(email, groupName);
      console.log(`Left group: ${groupName}`);
    } catch (error) {
      // Handle errors if leaving the group fails
      console.error("Error leaving the group");
    }
  };

  useEffect(() => {
    // Add click event listener to close dropdown when clicking outside
    document.addEventListener("click", handleClickOutside);

    // Log the groupMembers and groupFoods
    // console.log("groupMembers", groupMembers);
    // console.log("groupFoods", groupFoods);
    // console.log("buttontext", buttonText);

    return () => {
      // Remove the click event listener on component unmount
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("groupMembers state updated:", groupMembers);
  }, [groupMembers]);

  return (
    <div
      className={`dropdown ${isDropdownOpen ? "active" : ""}`}
      ref={dropdownRef}
    >
      <button className="buttonStyle" onClick={toggleDropdown}>
        {/* Change this to change the labels on the buttons */}
        {buttonText} {isDropdownOpen ? "-" : "+"}
      </button>
      <div className="dropdown-content-container">
        {isDropdownOpen && groupMembers && groupFoods && (
          <DropdownContent
            groupMembers={groupMembers}
            groupFoods={groupFoods}
            groupAllergies={groupAllergies}
            groupName={buttonText}
            onDeleteGroup={onDeleteGroup}
            onLeaveGroup={handleLeaveGroup}
          />
        )}
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
        // console.log(groups);
        setAllGroups(groups);
        // console.log("epic:", groups);
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
        for (let i = 0; i < allGroups.length; i++) {
          const group = allGroups[i];
          const usersInGroup = await getUsersInGroup(group);

          // match emails with groups
          if (usersInGroup.some((user) => user.email === email)) {
            newGroups.push(group);
          }
        }

        setUserGroups(newGroups);
        setLoading(false); // Set loading to false in case of an error
      } catch (error) {
        // console.log("Error filtering groups", error);
        alert("Error filtering groups");
        setLoading(false); // Set loading to false in case of an error
      }
    };

    if (!allGroups.length) {
      // If allGroups is empty, fetch the data
      fetchData();
    } else {
      // If allGroups has data, filter the groups
      filterGroups();
    }
  }, [allGroups, email]);

  const handleDeleteGroup = async (group) => {
    try {
      deleteGroup(group);
      console.log(group, " successfully deleted");
    } catch (error) {
      // Handle errors if the group deletion fails
      console.error("Group failed to create");
    }
  };

  return (
    <div>
      <CreateOrJoinGroup userGroups={userGroups} />
      <br />
      <div>
        <h2>My Groups</h2>
        {loading ? ( // Render a loading indicator if loading is true
          <p>Loading...</p>
        ) : (
          userGroups.map((group, index) => (
            <DropdownButton
              key={index}
              buttonText={group}
              onDeleteGroup={handleDeleteGroup}
            />
          ))
        )}
      </div>
      {/* Add more DropdownButtons as needed */}
    </div>
  );
}

export default Groups;
