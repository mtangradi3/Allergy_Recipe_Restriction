/** Author Andy Pham
 *
 *  Contains information about all meals
 *   */
import React, { useState, useEffect } from "react";
import { getAllMeals, getMealIngredients } from "../../api/mealAPI";
import {
  createUserFavoriteMeal,
  deleteUserFavoriteMeal,
} from "../../api/userAPI";
import "../../App.css";
import CreateMeal from "./CreateMeal";
import { useNavigate, useLocation } from "react-router-dom";

function AllMeals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [expandedMealIndex, setExpandedMealIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState({});
  const { email } = location.state || {};

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

  const handleMealClick = (meal) => {
    // Navigate to the meal details page with the meal object
    navigate(`/meal-details/${meal.meal_name}`, { state: { meal } });
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
          <li key={meal.meal_name}>
            <h2 onClick={() => handleMealClick(meal)}>{meal.meal_name}</h2>
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
            {meal.meal_image && (
              <img
                src={`data:image/jpeg;base64,${meal.meal_image}`}
                alt={meal.meal_name}
              />
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/create-meal", { state: { email } })}>
        Create New Meal
      </button>
    </div>
  );
}

export default AllMeals;
