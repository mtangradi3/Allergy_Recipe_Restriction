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

}
