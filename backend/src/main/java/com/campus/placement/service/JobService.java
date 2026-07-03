package com.campus.placement.service;

import com.campus.placement.entity.Job;
import com.campus.placement.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

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
}