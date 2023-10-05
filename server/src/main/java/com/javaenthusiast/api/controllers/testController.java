package com.javaenthusiast.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author: Marcus Tangradi
 */

@RestController
public class testController {

    @GetMapping("/api/controllers/testController")
    public String testController() {

        return "hello test";
    }
}
