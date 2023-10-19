/** Author Andy Pham
 *
 *  Contains the creation of a meal
 *   */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllIngredients } from "../../api/mealAPI";

function CreateMeal() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]); // Filtered ingredients based on search term
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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

  useEffect(() => {
    setFilteredIngredients(
      ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, ingredients]);

  const addIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
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
          Search Ingredient:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        {filteredIngredients.map((ingredient) => (
          <div key={ingredient}>
            {ingredient}
            <button onClick={() => addIngredient(ingredient)}>Add</button>
          </div>
        ))}

        <label>
          Selected Ingredients:
          {selectedIngredients.map((ingredient, index) => (
            <div key={index}>{ingredient}</div>
          ))}
        </label>

        <button type="submit">Add Meal</button>
      </form>

      <button onClick={() => navigate(-1)} className="go-back-btn">
        Go Back
      </button>
    </div>
  );
}

export default CreateMeal;
