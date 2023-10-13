/**
 * Author: Sarah Pham
 * Date: 10/13/2023
 * File: groupAPI
 */

import axios from "axios";
import {GET_ALL_USERS, INSERT_NEW_GROUP, INSERT_NEW_USER} from "../utils/constant";

/**
 * this function will get all the groups to display
 */
// export const getAllGroups = async () => {
//     try {
//         const response = await axios.get(GET_ALL_USERS, {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

/**
 * this function will create a new group
 *
 * @param groupName
 * @returns {Promise<any>} an error if there is a duplicate
 */
export const createGroup = async (groupName) => {
    const params = new URLSearchParams();
    params.append("groupName", groupName);

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