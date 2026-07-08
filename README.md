# 🎓 Campus Placement App

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=Spring-Boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

> A full-stack Campus Placement Management System that enables students to discover placement opportunities, apply for jobs, upload resumes, and track application status while allowing administrators to manage students, jobs, and applications through an intuitive dashboard.

---

## ✨ Features

### 🧑‍🎓 Student Module
* **Authentication:** Secure Login & Registration using JWT Authentication.
* **Job Discovery:** View all available placement opportunities.
* **Application Tracking:** Apply for jobs with one click and track status (Applied, Approved, Rejected).
* **Document Management:** Upload, view, and update resumes (PDF).
* **Personalized Dashboard:** View placement statistics and manage your personal profile.

### 👨‍💼 Admin Module
* **Admin Controls:** Secure Admin Login and role-based authorization.
* **Job Management:** Add, edit, and delete job postings.
* **Student Oversight:** Manage student accounts, view profiles, and access uploaded resumes.
* **Application Processing:** View all job applications and update their statuses.
* **Analytics Dashboard:** View global statistics including total students, jobs, and recent applications.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React Native (Expo), Expo Router, React Navigation, Axios, Expo Secure Store, Expo Document Picker |
| **Backend** | Java, Spring Boot, Spring Data JPA, Spring Security, JWT Authentication, Maven |
| **Database** | MySQL |
| **Deployment** | Backend: Railway \| Android App: Expo EAS Build |

---

## 📂 Project Structure

```text
Campus-Placement-App
│
├── backend
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   ├── DTO
│   ├── Config
│   └── Security
│
└── frontend
    ├── app
    ├── components
    ├── services
    ├── assets
    └── navigation
