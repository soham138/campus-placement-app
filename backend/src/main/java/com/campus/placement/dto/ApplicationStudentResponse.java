package com.campus.placement.dto;

public class ApplicationStudentResponse {

    private Long applicationId;
    private String jobTitle;
    private String company;
    private String location;
    private String status;

    public ApplicationStudentResponse() {}

    public ApplicationStudentResponse(
        Long applicationId,
        Long jobId,
        String jobTitle,
        String company,
        String location,
        String status) {

    this.applicationId = applicationId;
    this.jobId = jobId;
    this.jobTitle = jobTitle;
    this.company = company;
    this.location = location;
    this.status = status;
}
    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private Long jobId;

public Long getJobId() {
    return jobId;
}

public void setJobId(Long jobId) {
    this.jobId = jobId;
}
}