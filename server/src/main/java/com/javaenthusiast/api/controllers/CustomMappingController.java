package com.javaenthusiast.api.controllers;

/**
 * Author: Marcus Tangradi
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class CustomMappingController {

    @Autowired
    private RequestMappingHandlerMapping requestMappingHandlerMapping;

    @GetMapping("/api/mymappings")
    public Map<RequestMappingInfo, String> getMyApiMappings() {
        return requestMappingHandlerMapping.getHandlerMethods().entrySet()
                .stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().toString()));
    }


}
