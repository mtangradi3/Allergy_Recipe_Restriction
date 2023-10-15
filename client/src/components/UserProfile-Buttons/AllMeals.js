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
            <h2>{meal.mealName}</h2>
            {/* Assuming mealImage is a URL */}
            <img src={meal.mealImage} alt={meal.mealName} />
            <p>Email: {meal.email}</p>
            <p>Ingredients:</p>
            <ul>
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllMeals;
