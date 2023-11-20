package com.javaenthusiast.api.services;

import com.javaenthusiast.exceptions.CustomDatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Author: Marcus Tangradi
 */

/**
 * this class will be the logic for the UserControl class.
 * This is where we connect to the database
 */
@Service
public class UserServices {


    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertUser(String firstName, String lastName, String email) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_user");
//        System.out.println(firstName +" " + lastName);
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("first_name", firstName)
                .addValue("last_name", lastName)
                .addValue("email", email);

        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error inserting user", e);
        }
    }

    public List<Map<String, Object>> getAllUsers() throws CustomDatabaseException {
        List<Map<String, Object>> users;

        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_users");

        try {
            // Execute the stored procedure and fetch the result
            Map<String, Object> out = call.execute();

            // Assuming that the result from the stored procedure is a list stored under a key named "result"
            users = (List<Map<String, Object>>) out.get("#result-set-1");

            if(users == null) {
                users = new ArrayList<>();
            }

        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            throw new CustomDatabaseException("Error fetching users", e);
        }

        return users;
    }


    public void giveUserAllergy(String email, List<String> allergies) {

        allergies.forEach(tempAllergy ->{
            SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("creating_user_plagued_by_allergy");


            SqlParameterSource in = new MapSqlParameterSource()
                .addValue("email", email)
                .addValue("food_allergy_category", tempAllergy);


            try {
                call.execute(in);

            } catch (DataAccessException e) {
                // Handle exception related to the stored procedure here.
                // The duplicate email SIGNAL will throw an exception you can catch and handle.
                throw new CustomDatabaseException("Error giving user an allergy", e);
         }
        });
    }

    public void addUserToGroup(String email, String groupName) {

        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("put_user_into_group");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("group_name",groupName)
                .addValue("user_email", email);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error inserting user into group", e);
        }
    }


    public void deleteUser(String email) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_user");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("email",email);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error deleting a user", e);
        }

    }

    public void deleteAllergyFromUser(String allergy_name,String email) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_allergy_from_user");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("allergy_name",allergy_name)
                .addValue("email",email);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error deleting allergy from user", e);
        }

    }

    public void createUserFavoritesMeal(String email, String mealName) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("create_user_favorites_meal");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("email", email)
                .addValue("meal", mealName);

        try {
            call.execute(in);
        } catch (DataAccessException e) {

            throw new CustomDatabaseException("Error favoriting this meal", e);
        }
    }

    public List<String> getUserFavoritesMeal(String email) {
        List<String> favoriteMeals =  new ArrayList<>();
        List<Map<String, Object>> tempFavoriteMeals = new ArrayList<>();

        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_user_favorites_meal");
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("email", email);

        try {

            Map<String, Object> out = call.execute(in);
            tempFavoriteMeals = (List<Map<String, Object>>) out.get("#result-set-1");

            tempFavoriteMeals.forEach(tempMap ->{
                favoriteMeals.add((String)tempMap.get("meal_name"));
            });

        } catch (DataAccessException e) {
            throw new CustomDatabaseException("Error getting all ingredients", e);
        }

        return favoriteMeals;
    }

    public void removeUserToGroup(String email, String groupName) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("leave_group");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("group_name",groupName)
                .addValue("email", email);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error removing user from group", e);
        }


    }

    public void deleteUserFavoritesMeal(String email,String meal_name) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_user_favorites_meal");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("email",email)
                .addValue("meal",meal_name);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error deleting favorite meal from user", e);
        }

    }

    public void user_rates_meal(String rating, String review, String email, String meal) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("user_rates_meal");
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("rating",rating)
                .addValue("review",review)
                .addValue("email",email)
                .addValue("meal",meal);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error rating meal", e);
        }

    }
    public void deleteUserRatesMeal(String email,String meal_name) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_user_rates_meal");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("email",email)
                .addValue("meal",meal_name);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error deleting favorite meal from user", e);
        }

    }
}

