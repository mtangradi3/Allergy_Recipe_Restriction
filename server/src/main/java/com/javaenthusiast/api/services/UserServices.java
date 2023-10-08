package com.javaenthusiast.api.services;

import com.javaenthusiast.exceptions.CustomDatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

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
        System.out.println(firstName +" " + lastName);
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("first_name", firstName)
                .addValue("last_name", lastName)
                .addValue("email", email);

        try {
            Map<String, Object> out = call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error inserting user", e);
        }
    }

}
