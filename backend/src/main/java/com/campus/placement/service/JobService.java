package com.campus.placement.service;

import com.campus.placement.entity.Job;
import com.campus.placement.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.ArrayList;
import com.campus.placement.dto.JobResponse;
import com.campus.placement.repository.ApplicationRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
private ApplicationRepository applicationRepository;

    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {

    return jobRepository
            .findById(id)
            .orElse(null);
}

public Job updateJob(Long id, Job updatedJob) {

    Job job = jobRepository.findById(id).orElse(null);

    if (job == null) {
        return null;
    }

    job.setTitle(updatedJob.getTitle());
    job.setCompany(updatedJob.getCompany());
    job.setLocation(updatedJob.getLocation());
    job.setDescription(updatedJob.getDescription());

    return jobRepository.save(job);
}

public void deleteJob(Long id) {

    jobRepository.deleteById(id);

}

public List<JobResponse> getAllJobsWithApplicants() {

    List<Job> jobs = jobRepository.findAll();

    List<JobResponse> response = new ArrayList<>();

    for (Job job : jobs) {

        response.add(

                new JobResponse(

                        job.getId(),

                        job.getTitle(),

                        job.getCompany(),

                        job.getLocation(),

                        job.getDescription(),

                        applicationRepository.countByJobId(job.getId())

                )

        );

    }

    return response;

}
}