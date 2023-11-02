import React, { useState, useEffect } from "react";
import { createNewIngredient } from "../../api/mealAPI";
import { getAllAllergies } from "../../api/allergyAPI";

const CreateIngredient = () => {
  const [ingredientName, setIngredientName] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        const fetchedAllergies = await getAllAllergies();
        setAllergies(fetchedAllergies);
      } catch (error) {
        console.error("Failed to fetch allergies:", error.message);
        setError("Failed to fetch allergies. Please try again later.");
      }
    };

    fetchAllergies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await createNewIngredient(
        ingredientName,
        selectedAllergy,
      );
      console.log("Ingredient created successfully:", response);
      setSuccess("Ingredient created successfully.");
      setIngredientName("");
      setSelectedAllergy("");
    } catch (error) {
      console.error("Failed to create ingredient:", error.message);
      setError("Failed to create ingredient. Please try again.");
    }
  };

  return (
    <div className="create-ingredient-container">
      <h2>Create New Ingredient</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
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

        <div className="input-group">
          <label htmlFor="allergy">Allergy:</label>
          <select
            id="allergy"
            value={selectedAllergy}
            onChange={(e) => setSelectedAllergy(e.target.value)}
            required
          >
            <option value="">Select an Allergy</option>
            {allergies.map((allergy, index) => (
              <option key={index} value={allergy}>
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
