package com.javaenthusiast.api.controllers;

import com.javaenthusiast.api.services.GroupServices;
import com.javaenthusiast.api.services.UserServices;
import com.javaenthusiast.exceptions.CustomDatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author: Marcus Tangradi
 *
 * This will have all main functions that interact with the user groups
 *
 */

@RestController
@RequestMapping("/api/group")
public class GroupControl {

    @Autowired
    private GroupServices groupServices;

    @GetMapping("/add_user_to_group")
    public ResponseEntity<?> giveUserAllergies( @RequestParam String group_name){
        try {
            groupServices.creatNewGroup( group_name);
            return ResponseEntity.ok("group was created successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

}
