package com.javaenthusiast.api.services;

import com.javaenthusiast.exceptions.CustomDatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

/**
 * Author: Marcus Tangradi
 */


@Service
public class GroupServices {


    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void creatNewGroup(String groupName) {

        //TODO: create a new group using `insert_new_user_group` procedure


        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_new_user_group");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("group_name", groupName);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error inserting user into group", e);
        }

    }
}
