/** Author Andy Pham
 *
 *  Contains the creation of a meal
 *   */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllIngredients, insertNewMeal } from "../../api/mealAPI";
import "../../CreateMeal.css";

function CreateMeal() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const location = useLocation();
  const { email } = location.state || {};
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const mealName = e.target.mealName.value;
    const mealImage = e.target.mealImage.files[0];

    try {
      const response = await insertNewMeal(
        mealName,
        mealImage,
        email,
        selectedIngredients,
      );
      // Display success message to the user
      setSuccessMessage("Meal created successfully!");
      setErrorMessage(""); // Clear any previous error
      console.log(response);
    } catch (error) {
      console.error("Failed to insert meal:", error);
      // Display error message to the user
      setErrorMessage("Failed to create the meal. Please try again.");
      setSuccessMessage(""); // Clear any previous success
    }

    try {
      const response = await insertNewMeal(
        mealName,
        mealImage,
        email,
        selectedIngredients,
      );
      console.log(response); // Should print "create new meal successful" if successful
      // You can navigate to another page or show a success message here.
    } catch (error) {
      console.error("Failed to insert meal:", error);
      // Show an error message to the user if required.
    }
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

  const removeIngredient = (event, ingredient) => {
    event.stopPropagation(); // This will prevent the event from propagating further
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient),
    );
  };

  return (
    <div>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

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
              type="button"
              className="ingredient-button"
              onClick={() => addIngredient(ingredient)}
            >
              +
            </button>
          </div>
        ))}

        <label>
          Selected Ingredients:
          {selectedIngredients.map((ingredient) => (
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
                type="button"
                className="ingredient-button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeIngredient(e, ingredient);
                }}
              >
                −
              </button>
            </div>
          ))}
        </label>

        <button type="submit" className="add-meal-button">
          Add Meal
        </button>
      </form>

      <button onClick={() => navigate(-1)} className="go-back-btn">
        Go Back
      </button>
    </div>
  );
}

export default CreateMeal;
