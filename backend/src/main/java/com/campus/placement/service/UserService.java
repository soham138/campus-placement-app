package com.campus.placement.service;

import com.campus.placement.entity.User;
import com.campus.placement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.campus.placement.config.JwtUtil;
import com.campus.placement.dto.LoginResponse;
import com.campus.placement.dto.ProfileResponse;

import com.campus.placement.dto.StudentResponse;
import java.util.ArrayList;
import java.util.List;

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

    public LoginResponse loginUser(String email, String password) {

    User user = userRepository.findByEmail(email);

    if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid Credentials");
    }

    String token = jwtUtil.generateToken(email);

    return new LoginResponse(
            token,
            user.getId(),
            user.getRole()
    );
}

public ProfileResponse getProfile(String token) {

    String email = jwtUtil.extractEmail(token);

    User user = userRepository.findByEmail(email);

    return new ProfileResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole()
    );
}

public List<StudentResponse> getAllStudents() {

    List<User> students =
            userRepository.findByRole("STUDENT");

    List<StudentResponse> response =
            new ArrayList<>();

    for (User user : students) {

        response.add(

                new StudentResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                )

        );

    }

    return response;
}
}