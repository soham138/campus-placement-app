package com.campus.placement.controller;


import com.campus.placement.entity.Job;
import com.campus.placement.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.campus.placement.dto.JobResponse;


import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping
    public Job addJob(@RequestBody Job job) {
        return jobService.addJob(job);
    }

    @GetMapping
public List<JobResponse> getAllJobs() {
    return jobService.getAllJobsWithApplicants();
}

    @GetMapping("/{id}")
    public Job getJobById(
            @PathVariable Long id) {

        return jobService.getJobById(id);
    }

    @PutMapping("/{id}")
public ResponseEntity<Job> updateJob(
        @PathVariable Long id,
        @RequestBody Job job) {

    Job updated = jobService.updateJob(id, job);

    if (updated == null) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(updated);
}

@DeleteMapping("/{id}")
public ResponseEntity<String> deleteJob(@PathVariable Long id) {

    jobService.deleteJob(id);

    return ResponseEntity.ok("Job deleted successfully");
}
}