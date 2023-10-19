/** Author Andy Pham
 *
 *  Contains the creation of a meal
 *   */

import React from "react";

function CreateMeal(props) {
  const handleNewMealClick = () => {
    alert("Create New Meal button clicked!");
    // Replace the alert with your desired logic, e.g., navigation, modal display, etc.
  };

  return (
    <button onClick={handleNewMealClick} className="create-new-meal-btn">
      Create New Meal
    </button>
  );
}

export default CreateMeal;
