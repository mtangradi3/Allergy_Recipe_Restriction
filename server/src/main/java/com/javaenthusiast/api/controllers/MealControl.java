package com.javaenthusiast.api.controllers;

import com.javaenthusiast.api.services.MealServices;
import com.javaenthusiast.api.services.UserServices;
import com.javaenthusiast.exceptions.CustomDatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * Author: Marcus Tangradi
 *
 * This will be the main class for all meal functions
 */

@RestController
@RequestMapping("/api/meal")
public class MealControl {


    //this is the Service class that will do all of the user functions/procedures
    @Autowired
    private MealServices mealService;

    @GetMapping("/get_all_ingredients")
    public ResponseEntity<?> getAllIngredients() {


        try {
            List<String> ingredients = mealService.getAllIngredients();
            return ResponseEntity.ok(ingredients);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @PostMapping("/insert_meal")
    public ResponseEntity<?> insertNewMeal(@RequestParam String meal_name, @RequestParam(required = false) MultipartFile meal_image , @RequestParam String email, @RequestParam List<String> ingredients) {


        try {
           mealService.insertNewMeal(meal_name, meal_image, email, ingredients);
            return ResponseEntity.ok("create new meal successful");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }


    @GetMapping("/get_all_meals")
    public ResponseEntity<?> getAllMeals() {


        try {
            List<Map<String, Object>> meals = mealService.getAllMeals();
            return ResponseEntity.ok(meals);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @GetMapping("/get_meal_ingredients")
    public ResponseEntity<?> getMealAndIngredients(@RequestParam String mealName) {


        try {
            List<String> getMealIngredients = mealService.getmealIngredients(mealName);
            return ResponseEntity.ok(getMealIngredients);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @GetMapping("/get_possible_meal_with_allergy")
    public ResponseEntity<?> getAllMealsWithAllergy(@RequestParam String email) {


        try {
            List<Map<String,Object>> mealsWithAllergies = mealService.getAllMealsWithAllergy(email);
            return ResponseEntity.ok(mealsWithAllergies);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

}
