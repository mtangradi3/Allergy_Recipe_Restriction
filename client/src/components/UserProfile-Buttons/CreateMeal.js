/** Author Andy Pham
 *
 *  Contains the creation of a meal
 *   */

import React from "react";
import { useNavigate } from "react-router-dom";

function CreateMeal() {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call your API or any other logic to save the meal here
    alert("Meal Added"); // Just a placeholder for now
  };

  return (
    <div>
      <h1>Create a New Meal</h1>

      <form onSubmit={handleFormSubmit}>
        <label>
          Meal Name:
          <input type="text" name="mealName" />
        </label>

        <label>
          Upload Image:
          <input type="file" name="mealImage" />
        </label>

        <label>
          Add Ingredient:
          <input type="text" name="ingredient" />
        </label>

        {/* Ideally, you'll have logic to add multiple ingredients and list them below this input */}

        <button type="submit">Add Meal</button>
      </form>

      <button onClick={() => navigate(-1)} className="go-back-btn">
        Go Back
      </button>
    </div>
  );
}

export default CreateMeal;
