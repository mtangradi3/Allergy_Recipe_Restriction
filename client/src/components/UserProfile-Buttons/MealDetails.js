// MealDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealIngredients } from "../../api/mealAPI";

function MealDetails() {
  const { mealName } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const ingredients = await getMealIngredients(mealName);
        // Assuming you have an API call that gets the complete details including the image
        setMealDetails({
          ...mealDetails,
          ingredients: ingredients,
        });
      } catch (error) {
        setError("Failed to fetch meal details.");
      }
    };

    fetchMealDetails();
  }, [mealName]);

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
        {mealDetails.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
      {/* Add more meal details here */}
    </div>
  );
}

export default MealDetails;
