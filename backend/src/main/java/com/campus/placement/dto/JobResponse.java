package com.campus.placement.dto;

public class JobResponse {

    private Long id;
    private String title;
    private String company;
    private String location;
    private String description;
    private Long applicants;

    public JobResponse() {
    }

    public JobResponse(
            Long id,
            String title,
            String company,
            String location,
            String description,
            Long applicants
    ) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.description = description;
        this.applicants = applicants;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getApplicants() {
        return applicants;
    }

    public void setApplicants(Long applicants) {
        this.applicants = applicants;
    }

}