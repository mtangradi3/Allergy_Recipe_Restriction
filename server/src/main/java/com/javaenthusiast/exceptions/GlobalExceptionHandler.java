package com.javaenthusiast.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Author: Marcus Tangradi
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomDatabaseException.class)
    public ResponseEntity<String> handleCustomDatabaseException(CustomDatabaseException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }
    // ... handle other exceptions as needed
}
