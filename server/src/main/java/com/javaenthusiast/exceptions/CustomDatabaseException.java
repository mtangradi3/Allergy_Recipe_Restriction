package com.javaenthusiast.exceptions;

/**
 * Author: Marcus Tangradi
 */
public class CustomDatabaseException extends RuntimeException {

    public CustomDatabaseException(String message, Throwable cause) {
        super(message, cause);

    }
}
