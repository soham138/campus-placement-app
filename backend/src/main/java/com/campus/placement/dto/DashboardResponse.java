package com.campus.placement.dto;

public class DashboardResponse {

    private long totalStudents;
    private long totalJobs;
    private long totalApplications;
    private long approvedApplications;
    private long rejectedApplications;
    private long pendingApplications;

    public DashboardResponse() {
    }

    public DashboardResponse(
            long totalStudents,
            long totalJobs,
            long totalApplications,
            long approvedApplications,
            long rejectedApplications,
            long pendingApplications
    ) {
        this.totalStudents = totalStudents;
        this.totalJobs = totalJobs;
        this.totalApplications = totalApplications;
        this.approvedApplications = approvedApplications;
        this.rejectedApplications = rejectedApplications;
        this.pendingApplications = pendingApplications;
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

    public long getApprovedApplications() {
        return approvedApplications;
    }

    public void setApprovedApplications(long approvedApplications) {
        this.approvedApplications = approvedApplications;
    }

    public long getRejectedApplications() {
        return rejectedApplications;
    }

    public void setRejectedApplications(long rejectedApplications) {
        this.rejectedApplications = rejectedApplications;
    }

    public long getPendingApplications() {
        return pendingApplications;
    }

    public void setPendingApplications(long pendingApplications) {
        this.pendingApplications = pendingApplications;
    }
}