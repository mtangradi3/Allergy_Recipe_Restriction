/**
 * Author: Marcus Tangradi
 * Date: 10/8/2023
 * File: userAPI
 */

import axios from "axios";
import {GET_ALL_USERS, INSERT_NEW_USER, ADD_USER_ALLERGIES, REMOVE_USER_ALLERGIES} from "../utils/constant";

/**
 * this function will insert a new user into the database if it does not exist
 *
 * @param firstName
 * @param lastName
 * @param email
 * @returns {Promise<any>} an error if there is a duplicate
 */
export const createUser = async (firstName, lastName, email) => {
  const params = new URLSearchParams();
  params.append("firstName", firstName);
  params.append("lastName", lastName);
  params.append("email", email);

  try {
    const response = await axios.post(INSERT_NEW_USER, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(GET_ALL_USERS, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUserAllergy = async (
    email,
    allergy,
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("allergies", allergy);

  try {
    const response = await axios.post(ADD_USER_ALLERGIES, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeUserAllergy = async (
    allergy,
    email,

) => {
  const formData = new FormData();
  formData.append("allergy_name", allergy);
  formData.append("email", email);


  try {
    const response = await axios.delete(REMOVE_USER_ALLERGIES, {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

