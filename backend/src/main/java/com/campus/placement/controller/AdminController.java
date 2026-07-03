package com.campus.placement.controller;

import com.campus.placement.dto.DashboardResponse;
import com.campus.placement.dto.StudentResponse;
import com.campus.placement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.campus.placement.dto.ApplicationResponse;
import java.util.List;


import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {
        return adminService.getDashboard();
    }

    @GetMapping("/students")
    public List<StudentResponse> getStudents() {
        return adminService.getAllStudents();
    }
    @DeleteMapping("/students/{id}")
public String deleteStudent(@PathVariable Long id) {

    adminService.deleteStudent(id);

    return "Student deleted successfully";
}


@GetMapping("/applications")
public List<ApplicationResponse> getApplications() {

    return adminService.getAllApplications();

}


}