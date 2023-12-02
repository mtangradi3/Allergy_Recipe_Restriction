/** Author Andy Pham
 *
 *  Contains information about all meals
 *   */
import React, { useState, useEffect } from "react";
import { getAllMeals } from "../../api/mealAPI";
import "../../App.css";
import { getUserFavoritesMeal } from "../../api/userAPI";
import { useNavigate, useLocation } from "react-router-dom";

function AllMeals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [expandedMealIndex, setExpandedMealIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState([]); // State to hold favorite meals
  const { email, firstName, lastName } = location.state || {};

  useEffect(() => {
    const fetchMealsAndFavorites = async () => {
      try {
        // Fetch all meals
        const mealsData = await getAllMeals();
        setMeals(mealsData);

        // Fetch user favorites
        if (email) {
          const favoritesData = await getUserFavoritesMeal(email);
          setFavorites(favoritesData);
        }
      } catch (err) {
        setError(err.message || "An error occurred.");
      }
    };

    fetchMealsAndFavorites();
  }, [email]);

  const handleMealClick = (meal) => {
    navigate(`/meal-details/${meal.meal_name}`, {
      state: { email, meal, favorites, firstName, lastName },
    });
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
      <button onClick={() => navigate("/create-meal", { state: { email, firstName, lastName } })}>
        Create New Meal
      </button>
    </div>
  );
}

export default AllMeals;
