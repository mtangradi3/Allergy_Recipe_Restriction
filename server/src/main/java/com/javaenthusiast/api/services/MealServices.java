package com.javaenthusiast.api.services;

import com.javaenthusiast.exceptions.CustomDatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Author: Marcus Tangradi
 */


@Service
public class MealServices {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public List<String> getAllIngredients() {
        List<String> allIngredients =  new ArrayList<>();
        List<Map<String, Object>> tempIngredients = new ArrayList<>();

        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_ingredients");

        try {
            Map<String, Object> out = call.execute();
            tempIngredients = (List<Map<String, Object>>) out.get("#result-set-1");

            tempIngredients.forEach(tempMap ->{
                allIngredients.add((String)tempMap.get("ingredient_name"));
            });

            // This check is no longer necessary as allIngredients is never null
            // if(allIngredients == null) {
            //     allIngredients = new ArrayList<>();
            // }
        } catch (DataAccessException e) {
            throw new CustomDatabaseException("Error getting all ingredients", e);
        }

        return allIngredients;
    }

}
