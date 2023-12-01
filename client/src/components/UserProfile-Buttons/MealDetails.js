// MealDetails.js

import React, { useEffect, useState } from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import { getMealIngredients } from "../../api/mealAPI";
import {
  createUserFavoriteMeal,
  deleteUserFavoriteMeal,
  getUserFavoritesMeal,
} from "../../api/userAPI";

function MealDetails() {
  const { mealName } = useParams();
  const { state } = useLocation();
  const [mealDetails, setMealDetails] = useState(state?.meal);
  const [error, setError] = useState(null);
  const { email, firstName, lastName } = state || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const { meal, favorites } = state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealDetailsAndFavorites = async () => {
      try {
        let ingredients;
        // Fetch meal details if not already provided
        if (!mealDetails?.ingredients) {
          ingredients = await getMealIngredients(mealName);
        }

        // Fetch user's favorite meals
        const userFavorites = email ? await getUserFavoritesMeal(email) : [];

        // Set meal details and favorite status
        setMealDetails((prevDetails) => ({
          ...prevDetails,
          ingredients: ingredients || prevDetails.ingredients,
        }));
        setIsFavorite(userFavorites.includes(mealName));
      } catch (error) {
        setError("Failed to fetch data.");
      }

    };

    fetchMealDetailsAndFavorites();
  }, [mealName, mealDetails?.ingredients, email]); // Add email to the dependency array

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

  const handleMealClick = () => {
    const meal_name = meal.meal_name;
    console.log(meal_name)
    navigate(`/user-profile/create-review/`, {
      state: {  email, firstName, lastName, meal_name },
    });

    //navigate("/user-profile/create-review", { state: { email, firstName, lastName, meal } })}
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
        style={{ fontSize: "5rem", cursor: "pointer" }} // Increase font-size and add pointer cursor on hover
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
      <button
          className="buttonStyle"
          onClick={() => handleMealClick()}

      >
        Create a Review
      </button>
    </div>
  );
}

export default MealDetails;
