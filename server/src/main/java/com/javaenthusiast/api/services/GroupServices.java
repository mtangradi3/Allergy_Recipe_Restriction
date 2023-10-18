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
import java.util.Collection;
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

    public void deleteGroup(String groupName) {


        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate).withProcedureName("delete_group");

        SqlParameterSource in = new MapSqlParameterSource()
                .addValue("group_name", groupName);
        try {
            call.execute(in);
        } catch (DataAccessException e) {
            // Handle exception related to the stored procedure here.
            // The duplicate email SIGNAL will throw an exception you can catch and handle.
            throw new CustomDatabaseException("Error deleting group", e);
        }
    }

    public List<String> getPossibleFoodsOfGroup(String groupName) {
        List<Map<String, Object>> usersInGroup = getUsersInGroup(groupName);
        List<String> possibleFoods = new ArrayList<>();

        //used to call getAllFoods a user can eat with allergy
        MealServices mealServices = new MealServices();


        List<String> usersNamesInGroup = new ArrayList<>();
        //TODO: add emails from usersInGroup into this


        usersInGroup.forEach(map ->{
            List<String> possibleFoodList  = new ArrayList<>();
            List<Map<String,Object>> tempList = mealServices.getAllMealsWithAllergy((String) map.get("email"), jdbcTemplate);
//            System.out.println(tempList);
            tempList.forEach(meal_map ->{
                possibleFoodList.add((String) meal_map.get("meal_name"));
            });

            map.put("possible_foods", possibleFoodList);
        });

//        System.out.println(usersInGroup);

        if(usersInGroup.size() >0)
            possibleFoods.addAll((Collection<? extends String>) usersInGroup.get(0).get("possible_foods"));

        // Intersect with other users' foods
        for (Map<String, Object> user : usersInGroup) {
            if (user.get("possible_foods") instanceof List) {
                possibleFoods.retainAll((List<String>) user.get("possible_foods"));
            }
        }





        return possibleFoods;

    }
}
