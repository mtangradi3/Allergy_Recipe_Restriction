import React, { useState, useEffect } from "react";
import { getAllMealsWithAllergy } from "../../api/mealAPI";
import "../../App.css";
import { useLocation } from "react-router-dom";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { email } = location.state || {}; // Get the email from the state

  useEffect(() => {
    const fetchSuitableMeals = async () => {
      try {
        const data = await getAllMealsWithAllergy(email); // Fetch meals based on the user's email
        setMeals(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching meals.");
      }
    };

    fetchSuitableMeals();
  }, [email]);

  return (
    <div className="meal-container">
      <h1>Meals Suitable for Your Allergies</h1>

      {error && <div>Error: {error}</div>}

      <ul>
        {meals.map((meal, index) => (
          <li key={index}>
            <h2>{meal.meal_name}</h2>
            {meal.meal_image && (
              <img
                src={`data:image/jpeg;base64,${meal.meal_image}`}
                alt={meal.meal_name}
              />
            )}
            {meal.ingredients && (
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
    </div>
  );
}

export default Meals;
