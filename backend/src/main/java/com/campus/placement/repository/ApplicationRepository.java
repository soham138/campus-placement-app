package com.campus.placement.repository;

import com.campus.placement.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    List<Application> findByUserId(Long userId);

    Application findByUserIdAndJobId(
            Long userId,
            Long jobId
    );
}