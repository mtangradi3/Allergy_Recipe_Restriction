// mealAPI.js

import axios from "axios";
import {
  GET_ALL_MEALS,
  INSERT_NEW_MEAL,
  GET_MEAL_INGREDIENTS,
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
  mealName,
  mealImage,
  email,
  ingredients,
) => {
  const formData = new FormData();
  formData.append("mealName", mealName);
  formData.append("mealImage", mealImage); // Assumes mealImage is a File object
  formData.append("email", email);
  ingredients.forEach((ingredient, index) => {
    formData.append(`ingredients[${index}]`, ingredient);
  });

  try {
    const response = await axios.post(INSERT_NEW_MEAL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// mealAPI.js
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
