import axios from "axios";
import {
    GET_ALL_ALLERGIES,
    INSERT_NEW_MEAL,
    GET_MEAL_INGREDIENTS, GET_ALL_MEALS,
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