import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createNewIngredient } from "../api/mealAPI";
import { getAllAllergies } from "../api/allergyAPI";

const CreateIngredient = () => {
  const [ingredientName, setIngredientName] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState("");
  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {
    // Fetch allergies when the component mounts
    const fetchAllergies = async () => {
      try {
        const fetchedAllergies = await getAllAllergies();
        setAllergies(fetchedAllergies);
      } catch (error) {
        console.error("Failed to fetch allergies:", error.message);
      }
    };

    fetchAllergies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createNewIngredient(
        ingredientName,
        email,
        selectedAllergy,
      ); // Pass the selected allergy to the API
      console.log("Ingredient created successfully:", response);
    } catch (error) {
      console.error("Failed to create ingredient:", error.message);
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

        {/* Dropdown for allergies */}
        <div className="input-group">
          <label htmlFor="allergy">Allergy:</label>
          <select
            id="allergy"
            value={selectedAllergy}
            onChange={(e) => setSelectedAllergy(e.target.value)}
            required
          >
            <option value="">Select an Allergy</option>
            {allergies.map((allergy) => (
              <option key={allergy} value={allergy}>
                {allergy}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Ingredient</button>
      </form>
    </div>
  );
};

export default CreateIngredient;
