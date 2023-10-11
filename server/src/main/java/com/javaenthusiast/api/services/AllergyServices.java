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
public class AllergyServices {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void addNewAllergy(String allergyName) {


        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("insert_allergy");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("food_allergy_category", allergyName);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error creating a new allergy", e);
        }
    }

    public List<String> getAllAllergies() {
        List<Map<String, Object>> allergies =null;
        List<String> alergyNames = new ArrayList<>();


        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_all_allergies");


        try {
            // Execute the stored procedure and fetch the result
            Map<String, Object> out = call.execute();

            // Assuming that the result from the stored procedure is a list stored under a key named "result"
           allergies = (List<Map<String, Object>>) out.get("#result-set-1");

            allergies.forEach(tempMap ->{
                alergyNames.add((String)tempMap.get("food_allergy_category"));

            });

            if(allergies == null) {
                allergies = new ArrayList<>();
            }
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error getting all allergies", e);
        }


        return alergyNames;
    }

    public List<String> getUserAllergies(String email) {






        List<Map<String, Object>> allergies =null;
        List<String> alergyNames = new ArrayList<>();


        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_a_users_allergies");


        try {
            // Execute the stored procedure and fetch the result
            Map<String, Object> out = call.execute(email);

            // Assuming that the result from the stored procedure is a list stored under a key named "result"
            allergies = (List<Map<String, Object>>) out.get("#result-set-1");

            allergies.forEach(tempMap ->{
                alergyNames.add((String)tempMap.get("food_allergy_category"));

            });

            if(allergies == null) {
                allergies = new ArrayList<>();
            }
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error getting all allergies", e);
        }





        return alergyNames;
    }
}
