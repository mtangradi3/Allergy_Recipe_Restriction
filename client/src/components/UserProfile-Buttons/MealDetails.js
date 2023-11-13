// MealDetails.js

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMealIngredients } from "../../api/mealAPI";

function MealDetails() {
  const { mealName } = useParams();
  const { state } = useLocation();
  const [mealDetails, setMealDetails] = useState(state?.meal);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mealDetails?.ingredients) {
      const fetchMealDetails = async () => {
        try {
          const ingredients = await getMealIngredients(mealName);
          setMealDetails((prevDetails) => ({
            ...prevDetails,
            ingredients: ingredients,
          }));
        } catch (error) {
          setError("Failed to fetch meal details.");
        }
      };

      fetchMealDetails();
    }
  }, [mealName, mealDetails?.ingredients]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mealDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{mealDetails.meal_name}</h1>
      {mealDetails.meal_image && (
        <img
          src={`data:image/jpeg;base64,${mealDetails.meal_image}`}
          alt={mealDetails.meal_name}
        />
      )}
      <h2>Ingredients:</h2>
      <ul>
        {mealDetails.ingredients &&
          mealDetails.ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
      </ul>
      {/* Add more meal details here */}
    </div>
  );
}

export default MealDetails;
