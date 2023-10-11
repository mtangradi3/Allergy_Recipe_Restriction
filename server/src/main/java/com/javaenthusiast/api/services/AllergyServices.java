package com.javaenthusiast.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 * Author: Marcus Tangradi
 */


@Service
public class AllergyServices {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void addNewAllergy(String allergyName) {

        //TODO: insert new allergy using `insert_allergy` procedure
    }
}
