<div align="center">

# 🎓 Campus Placement App

### A Next-Generation Placement Management System

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=Spring-Boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

> A comprehensive full-stack placement management system that connects students with campus recruitment opportunities. The platform simplifies job discovery, application tracking, resume management, and provides administrators with a powerful dashboard to manage placement activities efficiently.

[Report Bug](https://github.com/your-username/Campus-Placement-App/issues) • [Request Feature](https://github.com/your-username/Campus-Placement-App/issues)

---

# 📸 Screenshots

<div align="center">

| Student Dashboard | Job Listings | Admin Panel |
|:-----------------:|:------------:|:-----------:|
| <img src="https://github.com/user-attachments/assets/1f3ff73f-ccf9-4973-bff8-feac19365be3" alt="Student Dashboard" width="230"/> | <img src="https://github.com/user-attachments/assets/424b86f3-1dbc-4b1e-bfad-69bf8a7a6052" alt="Job Listings" width="230"/> | <img src="https://github.com/user-attachments/assets/474b3b80-b1d8-48d3-a7d9-7562ff3c592c" alt="Admin Panel" width="230"/> |

</div>

---

# ✨ Features

## 👨‍🎓 Student Module

- 🔐 Secure Login & Registration using JWT Authentication
- 📋 Browse available campus placement drives
- 🔎 Search and filter job opportunities
- ✅ Apply for jobs with a single click
- 📄 Upload and manage resumes (PDF)
- 📊 Track application status (Applied, Approved, Rejected)
- 👤 Update personal profile
- 📈 View placement statistics on the dashboard

## 👨‍💼 Admin Module

- 🔒 Secure role-based Admin Portal
- ➕ Create, update, and delete job postings
- 👥 Manage student accounts
- 📄 View and download student resumes
- ✅ Review applications and update statuses
- 📊 Dashboard with placement analytics
- 📈 Monitor students, jobs, and application trends

---

# 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React Native (Expo), Expo Router, React Navigation, Axios, Expo Secure Store, Expo Document Picker |
| **Backend** | Java, Spring Boot, Spring Security, Spring Data JPA, JWT, Maven |
| **Database** | MySQL |
| **Deployment** | Railway (Backend), Expo EAS Build (Android) |

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

- Node.js & npm
- Java JDK 17+
- MySQL Server
- Expo CLI

---

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/soham138/campus-placement-app.git
```

### 2. Navigate to backend

```bash
cd campus-placement-app/backend
```

### 3. Configure MySQL

Edit:

```
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/campus_placement
spring.datasource.username=root
spring.datasource.password=your_password
```

### 4. Run the backend

```bash
mvnw spring-boot:run
```

---

## Frontend Setup

### 1. Navigate to frontend

```bash
cd campus-placement-app/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API URL

Update your API Base URL to:

- `localhost` (Android Emulator)
- Your Local IP (Physical Device)

### 4. Start Expo

```bash
npx expo start
```

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add AmazingFeature"
```

4. Push to your branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**. See the **LICENSE** file for more information.

---

<div align="center">

⭐ If you found this project helpful, consider giving it a **Star** on GitHub!

</div>
