package com.campus.placement.dto;

public class StudentDashboardResponse {

    private long totalJobs;
    private long appliedJobs;
    private long approvedJobs;
    private long pendingJobs;

    public StudentDashboardResponse() {
    }

    public StudentDashboardResponse(
            long totalJobs,
            long appliedJobs,
            long approvedJobs,
            long pendingJobs
    ) {
        this.totalJobs = totalJobs;
        this.appliedJobs = appliedJobs;
        this.approvedJobs = approvedJobs;
        this.pendingJobs = pendingJobs;
    }

    public long getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(long totalJobs) {
        this.totalJobs = totalJobs;
    }

    public long getAppliedJobs() {
        return appliedJobs;
    }

    public void setAppliedJobs(long appliedJobs) {
        this.appliedJobs = appliedJobs;
    }

    public long getApprovedJobs() {
        return approvedJobs;
    }

    public void setApprovedJobs(long approvedJobs) {
        this.approvedJobs = approvedJobs;
    }

    public long getPendingJobs() {
        return pendingJobs;
    }

    public void setPendingJobs(long pendingJobs) {
        this.pendingJobs = pendingJobs;
    }
}