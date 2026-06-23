package com.campus.placement.controller;

import com.campus.placement.entity.User;
import com.campus.placement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.campus.placement.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
public LoginResponse loginUser(@RequestBody User user) {

    return userService.loginUser(
            user.getEmail(),
            user.getPassword()
    );
}
}