import React, { useState, useEffect } from "react";
import { getAllMealsWithAllergy } from "../../api/mealAPI";
import "../../App.css";
import { useNavigate, useLocation } from "react-router-dom";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [expandedMealIndex, setExpandedMealIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState([]); // State to hold favorite meals
  const { email, firstName, lastName } = location.state || {};


  useEffect(() => {
    const fetchSuitableMeals = async () => {
      try {
        const data = await getAllMealsWithAllergy(email);
        setMeals(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching meals.");
      }
    };

    fetchSuitableMeals();
  }, [email]);

  const handleMealClick = (meal) => {
    navigate(`/meal-details/${meal.meal_name}`, {
      state: { email, meal, favorites, firstName, lastName  }, // Pass the necessary state
    });
  };

  return (
    <div className="meal-container">
      <h1>Meals Suitable for Your Allergies</h1>
      {error && <div>Error: {error}</div>}
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

export default Meals;
