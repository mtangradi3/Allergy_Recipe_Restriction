package com.javaenthusiast.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
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

    }
}
