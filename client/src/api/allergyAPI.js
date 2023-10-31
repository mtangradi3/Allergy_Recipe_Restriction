import axios from "axios";
import {
    GET_ALL_ALLERGIES,
    GET_USER_ALLERGIES,
    ADD_NEW_ALLERGY,
} from "../utils/constant"; // Add these constants to your constants file

/**
 * this function will get all allergies
 *
 * @returns {Promise<any>} an error if there is a duplicate
 */
export const getAllAllergies = async () => {
    try {
        const response = await axios.get(GET_ALL_ALLERGIES, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserAllergies = async (email) => {
    const params = new URLSearchParams();
    params.append("email", email);

    try {
        const response = await axios.get(GET_USER_ALLERGIES, {
            params: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const addNewAllergy = async (
    allergy,
) => {
    const formData = new FormData();
    formData.append("allergy_name", allergy);

    try {
        const response = await axios.post(ADD_NEW_ALLERGY, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};