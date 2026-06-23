package com.campus.placement.service;

import com.campus.placement.entity.Application;
import com.campus.placement.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application applyJob(Application application) {

        Application existing =
                applicationRepository.findByUserIdAndJobId(
                        application.getUserId(),
                        application.getJobId()
                );

        if (existing != null) {
            throw new RuntimeException("Already Applied");
        }

        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    public List<Application> getMyApplications(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    public Application updateStatus(Long applicationId, String status) {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElse(null);

        if (application != null) {

            application.setStatus(status);

            return applicationRepository.save(application);
        }

        return null;
    }
}