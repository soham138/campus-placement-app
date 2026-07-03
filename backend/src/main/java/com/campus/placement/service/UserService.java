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
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

import java.util.UUID;

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
        user.getRole(),
        user.getResume()
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
        user.getRole(),
        user.getResume()
)

        );

    }

    return response;
}

public void uploadResume(String token, MultipartFile file) throws IOException {

    String email = jwtUtil.extractEmail(token);

    User user = userRepository.findByEmail(email);

    File folder = new File(System.getProperty("user.dir") + "/uploads/resumes");

    if (!folder.exists() && !folder.mkdirs()) {
    throw new IOException("Unable to create upload folder");
}

    String fileName =
            UUID.randomUUID() + "_" + file.getOriginalFilename();

    File destination =
            new File(folder, fileName);

    file.transferTo(destination.toPath());

    user.setResume(fileName);

    userRepository.save(user);
}
}