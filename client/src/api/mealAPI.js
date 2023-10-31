// mealAPI.js

import axios from "axios";
import {
  GET_ALL_MEALS,
  INSERT_NEW_MEAL,
  GET_MEAL_INGREDIENTS,
  GET_ALL_INGREDIENTS,
} from "../utils/constant"; // Add these constants to your constants file

/**
 * Fetches all meals from the database.
 *
 * @returns {Promise<Array>} List of meals.
 */
export const getAllMeals = async () => {
  try {
    const response = await axios.get(GET_ALL_MEALS, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMealIngredients = async (mealName) => {
  try {
    const response = await axios.get(GET_MEAL_INGREDIENTS, {
      params: { mealName: mealName },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches all ingredients from the database.
 *
 * @returns {Promise<Array>} List of ingredients.
 */
export const getAllIngredients = async () => {
  try {
    const response = await axios.get(GET_ALL_INGREDIENTS, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Inserts a new meal into the database.
 *
 * @param {string} mealName
 * @param {File} mealImage
 * @param {string} email
 * @param {Array<string>} ingredients
 * @returns {Promise<any>} Response data or error.
 */
export const insertNewMeal = async (
  meal_name,
  meal_image,
  email,
  ingredients,
) => {
  try {
    const formData = new FormData();
    formData.append("meal_name", meal_name);

    // Only append the image if it's provided
    if (meal_image) {
      formData.append("meal_image", meal_image);
    }

    formData.append("email", email);
    for (const ingredient of ingredients) {
      formData.append("ingredients", ingredient);
    }

    const response = await axios.post("/api/meal/insert_meal", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // This will print the error to the console; you can also show it to the user or handle it in another way
    console.error("Failed to insert meal:", error.message);
    throw error;
  }
};
