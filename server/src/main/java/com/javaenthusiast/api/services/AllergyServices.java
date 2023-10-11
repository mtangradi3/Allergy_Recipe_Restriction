package com.javaenthusiast.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public List<String> getAllAllergies() {
        List<String> allergies =null;


        //TODO: get all allergies from `get_all_allergies` procedure and insert into allergies variable

        return allergies;
    }

    public List<String> getUserAllergies(String email) {

        List<String> allergies =null;


        //TODO: get all allergies of a user from `get_a_users_allergies` procedure and insert into allergies variable

        return allergies;
    }
}
