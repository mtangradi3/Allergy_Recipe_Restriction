import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { createNewIngredient } from "../api/mealAPI";

const CreateIngredient = () => {
  // State for the input field
  const [ingredientName, setIngredientName] = useState("");
  const location = useLocation();
  const { email } = location.state || {};

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    try {
      const response = await createNewIngredient(ingredientName, email);
      console.log("Ingredient created successfully:", response);
      // Optionally: Display a success message to the user or redirect them to another page
    } catch (error) {
      console.error("Failed to create ingredient:", error.message);
      // Optionally: Display an error message to the user
    }
  };

  return (
    <div className="create-ingredient-container">
      <h2>Create New Ingredient</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="ingredient-name">Ingredient Name:</label>
          <input
            type="text"
            id="ingredient-name"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Ingredient</button>
      </form>
    </div>
  );
};

export default CreateIngredient;
