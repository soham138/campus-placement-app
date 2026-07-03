package com.campus.placement.controller;

import com.campus.placement.entity.User;
import com.campus.placement.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.campus.placement.dto.ProfileResponse;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ProfileResponse getProfile(
        @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.substring(7);

    return userService.getProfile(token);
}
}