package com.campus.placement.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())   // IMPORTANT
                .authorizeHttpRequests(auth -> auth

    .requestMatchers("/api/auth/**").permitAll()

    .requestMatchers("/api/users/resume/**").permitAll()

    .requestMatchers("/api/admin/**").hasRole("ADMIN")

    .requestMatchers("/api/jobs/**").authenticated()

    .requestMatchers("/api/applications/**").authenticated()

    .anyRequest().authenticated()
)
                .addFilterBefore(jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}