import React, { useState, useEffect } from "react";
import { getAllMealsWithAllergy, getMealIngredients } from "../../api/mealAPI";
import "../../App.css";
import { useNavigate, useLocation } from "react-router-dom";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [expandedMealIndex, setExpandedMealIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

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

  const handleMealClick = async (mealName, index) => {
    const newIndex = index === expandedMealIndex ? null : index;
    setExpandedMealIndex(newIndex);

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

  return (
    <div className="meal-container">
      <h1>Meals Suitable for Your Allergies</h1>
      {error && <div>Error: {error}</div>}
      <ul>
        {meals.map((meal, index) => (
          <li key={meal.meal_name}>
            <h2 onClick={() => handleMealClick(meal.meal_name, index)}>
              {meal.meal_name}
            </h2>
            {meal.meal_image && (
              <img
                src={`data:image/jpeg;base64,${meal.meal_image}`}
                alt={meal.meal_name}
              />
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
      <button onClick={() => navigate("/create-meal", { state: { email } })}>
        Create New Meal
      </button>
    </div>
  );
}

export default Meals;
