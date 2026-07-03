package com.campus.placement.dto;

public class DashboardResponse {

    private long totalStudents;
    private long totalJobs;
    private long totalApplications;

    public DashboardResponse() {
    }

    public DashboardResponse(
            long totalStudents,
            long totalJobs,
            long totalApplications) {

        this.totalStudents = totalStudents;
        this.totalJobs = totalJobs;
        this.totalApplications = totalApplications;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(long totalJobs) {
        this.totalJobs = totalJobs;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }
}