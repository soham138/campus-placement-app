package com.campus.placement.service;

import com.campus.placement.entity.User;
import com.campus.placement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.campus.placement.config.JwtUtil;
import com.campus.placement.dto.LoginResponse;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
private JwtUtil jwtUtil;

    public User registerUser(User user) {

        user.setRole("STUDENT");

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public LoginResponse loginUser(
        String email,
        String password) {

    User user = userRepository.findByEmail(email);

    if (user != null &&
            passwordEncoder.matches(
                    password,
                    user.getPassword())) {

        String token =
                jwtUtil.generateToken(email);

        return new LoginResponse(
                token,
                user.getId()
        );
    }

    return new LoginResponse(
            "Invalid Credentials",
            null
    );
}
}