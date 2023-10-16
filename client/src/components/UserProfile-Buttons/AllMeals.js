/** Author Andy Pham
 *
 *  Contains information about all meals
 *   */
import React, { useState, useEffect } from "react";
import { getAllMeals, getMealIngredients } from "../../api/mealAPI";
import "../../App.css";

function AllMeals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [expandedMealIndex, setExpandedMealIndex] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await getAllMeals();
        setMeals(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching meals.");
      }
    };

    fetchMeals();
  }, []);

  // AllMeals.js
  const handleMealClick = async (mealName, index) => {
    // Toggle the expanded meal index
    const newIndex = index === expandedMealIndex ? null : index;
    setExpandedMealIndex(newIndex);

    // If we're expanding a new meal, fetch its ingredients
    if (newIndex !== null) {
      try {
        const ingredients = await getMealIngredients(mealName);
        const updatedMeals = [...meals];
        updatedMeals[index].ingredients = ingredients;
        setMeals(updatedMeals);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
        setError("Failed to fetch ingredients.");
      }
    }
  };

  const handleNewMealClick = () => {
    alert("Create New Meal button clicked!");
    // Replace the alert with your desired logic, e.g., navigation, modal display, etc.
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="meal-container">
      <h1>All Meals</h1>
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>
            <h2
              onClick={() =>
                setExpandedMealIndex(index === expandedMealIndex ? null : index)
              }
            >
              {meal.meal_name}
            </h2>
            <h2 onClick={() => handleMealClick(meal.meal_name, index)}>
              {meal.meal_name}
            </h2>
            ;
            {meal.meal_image && (
              <img src={meal.meal_image} alt={meal.meal_name} />
            )}
            {index === expandedMealIndex && meal.ingredients && (
              <>
                <p>Ingredients:</p>
                <ul>
                  {meal.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleNewMealClick} className="create-new-meal-btn">
        Create New Meal
      </button>
    </div>
  );
}

export default AllMeals;
