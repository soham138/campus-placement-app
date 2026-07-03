package com.campus.placement.dto;

public class ApplicationResponse {

    private Long applicationId;
private String studentName;
private String email;

private Long jobId;
private Long userId;

private String jobTitle;
private String company;
private String location;

private String status;
    public ApplicationResponse() {}
    

    public ApplicationResponse(
        Long applicationId,
        Long userId,
        String studentName,
        String email,
        String jobTitle,
        String status
) {
    this.applicationId = applicationId;
    this.userId = userId;
    this.studentName = studentName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.status = status;
}


    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getJobId() {
    return jobId;
}

public void setJobId(Long jobId) {
    this.jobId = jobId;
}
public Long getUserId() {
    return userId;
}

public void setUserId(Long userId) {
    this.userId = userId;
}

//     private Long jobId;

// public Long getJobId() {
//     return jobId;
// }

// public void setJobId(Long jobId) {
//     this.jobId = jobId;
// }
}

