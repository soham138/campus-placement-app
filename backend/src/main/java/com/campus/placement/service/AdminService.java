package com.campus.placement.service;

import com.campus.placement.dto.ApplicationResponse;
import com.campus.placement.dto.DashboardResponse;
import com.campus.placement.dto.StudentResponse;
import com.campus.placement.entity.Application;
import com.campus.placement.entity.Job;
import com.campus.placement.entity.User;
import com.campus.placement.repository.ApplicationRepository;
import com.campus.placement.repository.JobRepository;
import com.campus.placement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    // Dashboard Statistics
    public DashboardResponse getDashboard() {

        long students = userRepository.count();
        long jobs = jobRepository.count();
        long applications = applicationRepository.count();

        return new DashboardResponse(
                students,
                jobs,
                applications
        );
    }

    // Get All Students
    public List<StudentResponse> getAllStudents() {

        List<User> students = userRepository.findByRole("STUDENT");

        List<StudentResponse> response = new ArrayList<>();

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

    // Delete Student
    public void deleteStudent(Long id) {

        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
    }

    // Get All Applications
    public List<ApplicationResponse> getAllApplications() {

        List<Application> applications = applicationRepository.findAll();

        List<ApplicationResponse> response = new ArrayList<>();

        for (Application application : applications) {

            User user = userRepository
                    .findById(application.getUserId())
                    .orElse(null);

            Job job = jobRepository
                    .findById(application.getJobId())
                    .orElse(null);

            ApplicationResponse item = new ApplicationResponse();

            item.setApplicationId(application.getId());

            // User ID
            item.setUserId(application.getUserId());

            item.setStudentName(
                    user != null ? user.getName() : "Unknown"
            );

            item.setEmail(
                    user != null ? user.getEmail() : "Unknown"
            );

            item.setJobTitle(
                    job != null ? job.getTitle() : "Unknown"
            );

            item.setStatus(application.getStatus());

            response.add(item);
        }

        return response;
    }
}

