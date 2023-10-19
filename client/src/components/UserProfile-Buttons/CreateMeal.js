/** Author Andy Pham
 *
 *  Contains the creation of a meal
 *   */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllIngredients } from "../../api/mealAPI";

function CreateMeal() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]); // All available ingredients
  const [searchTerm, setSearchTerm] = useState(""); // Current search term
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Ingredients selected for the new meal

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call your API or any other logic to save the meal here
    alert("Meal Added"); // Just a placeholder for now
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const allIngredients = await getAllIngredients();
        setIngredients(allIngredients);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

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
