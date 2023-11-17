package com.javaenthusiast.api.controllers;

import com.javaenthusiast.api.services.UserServices;
import com.javaenthusiast.exceptions.CustomDatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Author: Marcus Tangradi
 *
 */

/**
 * this class will act as the set of api endpoints that involve anything to do with a user
 * this means creation, update, etc
 */
@RestController
@RequestMapping("/api/user")
public class UserControl {


    //this is the Service class that will do all of the user functions/procedures
    @Autowired
    private UserServices userService;

    @PostMapping("/create_user")
    public ResponseEntity<?> createUser(@RequestParam String firstName,@RequestParam String lastName,@RequestParam String email) {


        try {
            userService.insertUser(firstName, lastName, email);
            return ResponseEntity.ok("User created successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @DeleteMapping("delete_user")
    public ResponseEntity<?> deleteUser(@RequestParam String email) {


        try {
            userService.deleteUser( email);
            return ResponseEntity.ok("User deleted successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @GetMapping("/get_all_users")
    public ResponseEntity<?> getAllUsers(){
        try {
            List<Map<String, Object>> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @PostMapping("/give_user_allergy")
    public ResponseEntity<?> giveUserAllergies(@RequestParam String email ,@RequestParam List<String> allergies){
        try {
            userService.giveUserAllergy(email, allergies);
            return ResponseEntity.ok("User was given an allergy successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }


    @PostMapping("/add_user_to_group")
    public ResponseEntity<?> addUserToGroup(@RequestParam String email ,@RequestParam String group_name){
        try {
            userService.addUserToGroup(email, group_name);
            return ResponseEntity.ok("User was added to a group successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @DeleteMapping("/remove_user_from_froup")
    public ResponseEntity<?> removeUserFromGroup(@RequestParam String email ,@RequestParam String group_name){
        try {
            userService.removeUserToGroup(email, group_name);
            return ResponseEntity.ok("User was removed from the group successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }


    @DeleteMapping("/delete_allergy_from_user")
    public ResponseEntity<?> deleteAllergyFromUser(@RequestParam String allergy_name ,@RequestParam String email){
        try {
            userService.deleteAllergyFromUser(allergy_name, email);
            return ResponseEntity.ok("allergy was successfully delete from user");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @PostMapping("/create_user_favorites_meal")
    public ResponseEntity<?> createUserFavoritesMeal(@RequestParam String email ,@RequestParam String meal_name){
        try {
            userService.createUserFavoritesMeal(email, meal_name);
            return ResponseEntity.ok("User was favorited this meal successfully ");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }
    @GetMapping("/get_user_favorites_meal")
    public ResponseEntity<?> getUserFavoritesMeal(@RequestParam String email){
        try {
            List<String> usersFavoritesMeal = userService.getUserFavoritesMeal(email);
            return ResponseEntity.ok(usersFavoritesMeal);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @DeleteMapping("/delete_user_favorites_meal")
    public ResponseEntity<?> deleteUserFavoritesMeal(@RequestParam String email ,@RequestParam String meal_name){
        try {
            userService.deleteUserFavoritesMeal(email, meal_name);
            return ResponseEntity.ok("  favorite meal from user  was successfully deleted ");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }
    @PostMapping("/user_rates_meal")
    public ResponseEntity<?> user_rates_meal(@RequestParam String rating,@RequestParam(required = false) String review,@RequestParam String email,@RequestParam String meal) {


        try {
            userService.user_rates_meal(rating, review, email,meal);
            return ResponseEntity.ok("rating was created successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }
}

