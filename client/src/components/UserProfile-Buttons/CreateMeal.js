/** Author Andy Pham
 *
 *  Contains the creation of a meal
 *   */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllIngredients } from "../../api/mealAPI";
import "../../App.css";

function CreateMeal() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call your API or any other logic to save the meal here
    // alert removed to not show a popup
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

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient),
    );
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
          <div
            key={ingredient}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {ingredient}
            <button
              className="ingredient-button"
              onClick={() => addIngredient(ingredient)}
            >
              +
            </button>
          </div>
        ))}

        <label>
          Selected Ingredients:
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {ingredient}
              <button
                className="ingredient-button"
                onClick={() => removeIngredient(ingredient)}
              >
                −
              </button>
            </div>
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
