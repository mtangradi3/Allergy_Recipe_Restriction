/** Author Andy Pham
 *
 *  Contains information about all meals
 *   */
import React, { useState, useEffect } from "react";
import { getAllMeals } from "../../api/mealAPI";

function AllMeals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Meals</h1>
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>
            <h2>{meal.meal_name}</h2>

            {/* Render meal image if it's available */}
            {meal.meal_image && (
              <img src={meal.meal_image} alt={meal.meal_name} />
            )}

            {/* If you have ingredients in your data,
                 you can render them using the following code.
                 For now, I'm assuming you'll have it in the future, so I'm leaving it commented out. */}
            {/*
            <p>Ingredients:</p>
            <ul>
              {meal.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
            */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllMeals;
