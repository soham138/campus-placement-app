package com.campus.placement.controller;

import com.campus.placement.entity.Application;
import com.campus.placement.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public Application applyJob(@RequestBody Application application) {
        return applicationService.applyJob(application);
    }

    @GetMapping("/my-applications/{userId}")
    public List<Application> getMyApplications(@PathVariable Long userId) {
        return applicationService.getMyApplications(userId);
    }

    @PutMapping("/update-status/{applicationId}")
public Application updateStatus(
        @PathVariable Long applicationId,
        @RequestParam String status) {

    return applicationService.updateStatus(applicationId, status);
}
}