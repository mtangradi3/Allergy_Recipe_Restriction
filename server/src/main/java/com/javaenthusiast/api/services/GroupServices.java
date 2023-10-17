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


@Service
public class GroupServices {


    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void creatNewGroup(String groupName) {




        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_new_user_group");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("group_name", groupName);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error creating a new group", e);
        }

    }

    public List<String> getAllGroupsNames() throws CustomDatabaseException {
        List<Map<String, Object>> groupNames =null;
        List<String> listOfGroupNames = new ArrayList<>();

        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_all_user_group");

        try {
            // Execute the stored procedure and fetch the result
            Map<String, Object> out = call.execute();

            // Assuming that the result from the stored procedure is a list stored under a key named "result"
            groupNames = (List<Map<String, Object>>) out.get("#result-set-1");

            groupNames.forEach(tempGroup -> {
                listOfGroupNames.add((String)tempGroup.get("name"));

            });


            if(groupNames == null) {
                groupNames = new ArrayList<>();
            }

        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            throw new CustomDatabaseException("Error fetching users", e);
        }

        return listOfGroupNames;
    }

    public List<Map<String, Object>> getUsersInGroup(String groupName) {
        List<Map<String, Object>> userNames =null;
        List<String> userList = new ArrayList<>();

        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_users_in_group");
        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("group_name", groupName);
        try {
            // Execute the stored procedure and fetch the result
            Map<String, Object> out = call.execute(in);

            // Assuming that the result from the stored procedure is a list stored under a key named "result"
            userNames = (List<Map<String, Object>>) out.get("#result-set-1");



        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            throw new CustomDatabaseException("Error fetching users", e);
        }

        return userNames;

    }
}
