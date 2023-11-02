// mealAPI.js

import axios from "axios";
import {
  GET_ALL_MEALS,
  INSERT_NEW_MEAL,
  GET_MEAL_INGREDIENTS,
  GET_ALL_INGREDIENTS,
  GET_MEALS_WITH_ALLERGY,
  CREATE_NEW_INGREDIENT,
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
      // Convert image to Base64 and append
      const base64Image = await toBase64(meal_image);
      formData.append("meal_image", base64Image);
    }

    formData.append("email", email);
    for (const ingredient of ingredients) {
      formData.append("ingredients", ingredient);
    }

    const response = await axios.post(INSERT_NEW_MEAL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to insert meal:", error.message);
    throw error;
  }
};

/**
 * Converts a file to its Base64 representation.
 *
 * @param {File} file - The file to be converted to Base64.
 * @returns {Promise<string>} - The Base64 representation of the file.
 */
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]); // Remove data:image part
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Fetches all possible meals based on user's allergies from the database.
 *
 * @param {string} allergy - The user's allergy.
 * @returns {Promise<Array>} List of meals.
 */
export const getAllMealsWithAllergy = async (email) => {
  try {
    const response = await axios.get(GET_MEALS_WITH_ALLERGY, {
      params: { email: email },
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
 * Creates a new ingredient in the database.
 *
 * @param {string} ingredientName - The name of the ingredient.
 * @param {string} allergy - Allergy classification for the ingredient.
 * @returns {Promise<any>} Response data or error.
 */
export const createNewIngredient = async (ingredientName, allergy) => {
  const formData = new FormData();
  formData.append("ingredient_name", ingredientName);
  formData.append("allergy_name", allergy);

  try {
    const response = await axios.post(CREATE_NEW_INGREDIENT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create ingredient:", error.message);
    throw error;
  }
};
