package com.javaenthusiast.api.controllers;

import com.javaenthusiast.api.services.GroupServices;
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
 * This will have all main functions that interact with the user groups
 *
 */

@RestController
@RequestMapping("/api/group")
public class GroupControl {

    @Autowired
    private GroupServices groupServices;

    @PostMapping("/create_new_group")
    public ResponseEntity<?> creatNewGroup( @RequestParam String group_name){
        try {
            groupServices.creatNewGroup( group_name);
            return ResponseEntity.ok("group was created successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @GetMapping("/get_all_groups_name")
    public ResponseEntity<?> getAllGroupsNames(){
        try {
            List<String> users = groupServices.getAllGroupsNames();
            return ResponseEntity.ok(users);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/get_users_in_group")
    public ResponseEntity<?> getUsersInGroup(@RequestParam String group_name){
        try {
            List<Map<String, Object>> users = groupServices.getUsersInGroup(group_name);
            return ResponseEntity.ok(users);
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @DeleteMapping("/delete_group")
    public ResponseEntity<?> deleteGroup( @RequestParam String group_name){
        try {
            groupServices.deleteGroup( group_name);
            return ResponseEntity.ok("group was deleted successfully");
        } catch (CustomDatabaseException e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

}
