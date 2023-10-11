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

        //TODO: database call to `put_user_into_group` procedure


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
}
