// MealDetails.js

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMealIngredients } from "../../api/mealAPI";
import {
  createUserFavoriteMeal,
  deleteUserFavoriteMeal,
} from "../../api/userAPI";

function MealDetails() {
  const { mealName } = useParams();
  const { state } = useLocation();
  const [mealDetails, setMealDetails] = useState(state?.meal);
  const [error, setError] = useState(null);
  const { email } = state || {};
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleFavorite = async () => {
    try {
      await createUserFavoriteMeal(email, mealDetails.meal_name);
      setIsFavorite(true);
    } catch (error) {
      console.error("Failed to favorite meal:", error);
    }
  };

  const handleUnfavorite = async () => {
    try {
      await deleteUserFavoriteMeal(email, mealDetails.meal_name);
      setIsFavorite(false);
    } catch (error) {
      console.error("Failed to un-favorite meal:", error);
    }
  };

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
      <span
        className={`heart-icon ${isFavorite ? "favorited" : ""}`}
        onClick={isFavorite ? handleUnfavorite : handleFavorite}
      >
        {isFavorite ? "❤️" : "♡"}
      </span>

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
