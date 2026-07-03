package com.campus.placement.controller;

import com.campus.placement.dto.ApplicationStudentResponse;
import com.campus.placement.entity.Application;
import com.campus.placement.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
public Application applyJob(
        @RequestBody Application application,
        Authentication authentication) {

    return applicationService.applyJob(
            application,
            authentication.getName()
    );
}

    @GetMapping("/my-applications")
public List<ApplicationStudentResponse> getMyApplications(
        Authentication authentication) {

    return applicationService.getMyApplications(
            authentication.getName()
    );
}

    @PutMapping("/update-status/{applicationId}")
    public Application updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {

        return applicationService.updateStatus(
                applicationId,
                status
        );
    }
}