package com.campus.placement.service;

import com.campus.placement.dto.ApplicationStudentResponse;
import com.campus.placement.entity.Application;
import com.campus.placement.entity.Job;
import com.campus.placement.repository.ApplicationRepository;
import com.campus.placement.repository.JobRepository;
import com.campus.placement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.campus.placement.entity.User;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public Application applyJob(
        Application application,
        String email) {
                User user = userRepository.findByEmail(email);

if (user == null) {
    throw new RuntimeException("User Not Found");
}

        Application existing =
                applicationRepository.findByUserIdAndJobId(
                        user.getId(),
                        application.getJobId()
                );

        if (existing != null) {
            throw new IllegalStateException("Already Applied");
        }

        application.setUserId(user.getId());
application.setStatus("APPLIED");
        return applicationRepository.save(application);
    }

    public List<ApplicationStudentResponse> getMyApplications(String email) {

        User user = userRepository.findByEmail(email);

Long userId = user.getId();

        List<Application> applications =
                applicationRepository.findByUserId(userId);

        List<ApplicationStudentResponse> response =
                new ArrayList<>();

        for (Application application : applications) {

            Job job =
                    jobRepository.findById(application.getJobId())
                            .orElse(null);

            response.add(

    new ApplicationStudentResponse(

            application.getId(),

            job != null ? job.getId() : null,

            job != null ? job.getTitle() : "Unknown",

            job != null ? job.getCompany() : "Unknown",

            job != null ? job.getLocation() : "Unknown",

            application.getStatus()
    )
);
        }

        return response;
    }

    public Application updateStatus(Long applicationId, String status) {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElse(null);

        if (application == null) {
            return null;
        }

        application.setStatus(status);

        return applicationRepository.save(application);
    }
}