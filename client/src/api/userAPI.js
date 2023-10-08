/**
 * Author: Marcus Tangradi
 * Date: 10/8/2023
 * File: userAPI
 */

import axios from 'axios';
import {INSERT_NEW_USER} from "../utils/constant";

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
    params.append('firstName', firstName);
    params.append('lastName', lastName);
    params.append('email', email);

    try {
        const response = await axios.post(INSERT_NEW_USER, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};