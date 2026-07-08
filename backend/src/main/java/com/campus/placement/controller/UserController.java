package com.campus.placement.controller;

import com.campus.placement.dto.ProfileResponse;
import com.campus.placement.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import com.campus.placement.dto.StudentDashboardResponse;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/dashboard")
public StudentDashboardResponse getDashboard(
        @RequestHeader("Authorization") String authHeader
) {

    String token = authHeader.substring(7);

    return userService.getDashboard(token);
}

    @GetMapping("/profile")
    public ProfileResponse getProfile(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        return userService.getProfile(token);
    }

    @PostMapping("/upload-resume")
public String uploadResume(
        @RequestHeader("Authorization") String authHeader,
        @RequestParam("file") MultipartFile file
) throws IOException {

    String token = authHeader.substring(7);

    userService.uploadResume(token, file);

    return "Resume Uploaded Successfully";
}

@GetMapping("/resume/{fileName}")
public ResponseEntity<Resource> getResume(
        @PathVariable String fileName
) throws IOException {

    Path path = Paths.get(System.getProperty("user.dir"),
            "uploads",
            "resumes",
            fileName);

    System.out.println("Looking for file: " + path.toAbsolutePath());

    Resource resource = new UrlResource(path.toUri());

    System.out.println("Exists = " + resource.exists());

    if (!resource.exists()) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .body(resource);
}

}