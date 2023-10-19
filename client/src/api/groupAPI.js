/**
 * Author: Sarah Pham
 * Date: 10/13/2023
 * File: groupAPI
 */

import axios from "axios";
import { GET_ALL_GROUPS, INSERT_NEW_GROUP, GET_USERS_IN_GROUP, ADD_USER_TO_GROUP } from "../utils/constant";

/**
 * this function will get all the groups to display
 */
export const getAllGroups = async () => {
    try {
        const response = await axios.get(GET_ALL_GROUPS, {
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
 * this function will create a new group
 *
 * @param groupName
 * @returns {Promise<any>} an error if there is a duplicate
 */
export const createGroup = async (groupName) => {
    const params = new URLSearchParams();
    params.append("group_name", groupName);

    try {
        const response = await axios.post(INSERT_NEW_GROUP, params, {
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
 * this function will get the users in the group (for display purposes)
 *
 * @param groupName
 * @returns {Promise<any>} an error if there is a duplicate
 */
export const getUsersInGroup = async (groupName) => {
    try {
        const response = await axios.get(GET_USERS_IN_GROUP, {
            params: {
                group_name: groupName,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * this function will add the current logged in user to the group
 *
 * @param email
 * @param groupName
 * @returns {Promise<any>} an error if there is a duplicate
 */
export const addUserToGroup = async (email, groupName) => {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("group_name", groupName);
    try {
        const response = await axios.post(ADD_USER_TO_GROUP, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};