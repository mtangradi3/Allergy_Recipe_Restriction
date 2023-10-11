package com.javaenthusiast.api.controllers;

import com.javaenthusiast.api.services.AllergyServices;
import com.javaenthusiast.api.services.GroupServices;
import com.javaenthusiast.exceptions.CustomDatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Author: Marcus Tangradi
 *
 * this class will contain all main endpoints for allergies
 *
 */


@RestController
@RequestMapping("/api/allergy")
public class AllergyControl {


    @Autowired
    private AllergyServices allergyServices;


    @PostMapping("/create_new_allergy")
    public ResponseEntity<?> giveUserAllergies(@RequestParam String allergy_name){
        try {
            allergyServices.addNewAllergy( allergy_name);
            return ResponseEntity.ok("allergy was created successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @GetMapping("/get_all_allergies")
    public ResponseEntity<?> getAllAllergies(){
        try {
            List<String> allergies = allergyServices.getAllAllergies( );
            return ResponseEntity.ok(allergies);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @GetMapping("/get_users_allergies")
    public ResponseEntity<?> getAllAllergies(@RequestParam String email){
        try {
            List<String> allergies = allergyServices.getUserAllergies( email);
            return ResponseEntity.ok(allergies);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

}
