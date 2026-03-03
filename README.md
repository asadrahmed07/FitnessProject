<div align="center">

# 🏋️ FitTrack AI — Microservices Fitness Platform

**A cloud-native fitness tracking application powered by AI-driven workout recommendations**

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.7-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-2025.0.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-cloud)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)](https://kafka.apache.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Keycloak](https://img.shields.io/badge/Keycloak-4D9FFF?style=for-the-badge&logo=keycloak&logoColor=white)](https://www.keycloak.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

<br/>

> Track your workouts. Get instant AI-powered analysis. Improve every session.

<br/>

<img width="1471" height="748" alt="image" src="https://github.com/user-attachments/assets/80a7ef52-a9c7-4d19-b03d-4b2d883150df" />

</div>

---

## 🌟 Overview

**FitTrack AI** is a production-grade, microservices-based fitness tracking platform built with **Spring Boot** and **React**. Users can log workouts and instantly receive intelligent, AI-generated feedback on their performance — including personalized training improvements, next-workout suggestions, and safety guidelines — all powered by **Google Gemini**.

The platform is designed with a **cloud-native** mindset: services are independently deployable, communicate both synchronously (REST/WebClient) and asynchronously (Apache Kafka), and are secured end-to-end via **Keycloak OAuth2**.

---

## 🏗️ Architecture

The application follows a microservices pattern with a central API Gateway as the single entry point for all clients. Here's the high-level architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                      React Frontend                          │
│               (React 19 + MUI + Redux Toolkit)               │
│               OAuth2 PKCE Auth via Keycloak                  │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP (Port 8080)
                        ▼
┌─────────────────────────────────────────────────────────────┐
│               API Gateway (Port: 8080)                       │
│     Spring Cloud Gateway WebFlux + OAuth2 Resource Server    │
│              Validates JWT → Routes Requests                 │
└───────┬──────────────────────┬──────────────────────────────┘
        │                      │
        ▼                      ▼
┌───────────────┐    ┌──────────────────┐
│  User Service │    │ Activity Service │
│  (Port: 8081) │◄───│  (Port: 8082)    │
│  PostgreSQL   │    │  MongoDB         │
└───────────────┘    └────────┬─────────┘
                              │ Apache Kafka
                              │ (topic: activity-events)
                              ▼
                   ┌──────────────────────┐
                   │     AI Service       │
                   │    (Port: 8083)      │
                   │  MongoDB + Gemini    │
                   └──────────────────────┘

Supporting Infrastructure:
  ├── Eureka Server        (Port: 8761)  — Service Discovery
  ├── Config Server        (Port: 8888)  — Centralized Configuration
  └── Keycloak             (Port: 8181)  — Identity & Access Management
```

---

## 🔧 Services

| Service | Port | Database | Role |
|---|---|---|---|
| **API Gateway** | `8080` | — | Single entry point, JWT validation, load-balanced routing |
| **User Service** | `8081` | PostgreSQL | User registration, profile management, ID validation |
| **Activity Service** | `8082` | MongoDB | Activity tracking, user validation, Kafka event publishing |
| **AI Service** | `8083` | MongoDB | Kafka consumer, Gemini API integration, recommendation storage |
| **Config Server** | `8888` | — | Centralized YAML configuration for all services |
| **Eureka Server** | `8761` | — | Service registry and discovery |
| **Keycloak** | `8181` | — | OAuth2 / OpenID Connect identity provider |

---

## 💻 Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Java 17, Spring Boot, Spring Cloud (Gateway, Eureka, Config) |
| **Frontend** | React 19, Vite, Material UI, Redux Toolkit, React Router |
| **Databases** | PostgreSQL (users), MongoDB (activities & recommendations) |
| **Messaging** | Apache Kafka (async event streaming) |
| **Security** | Keycloak (OAuth2 / OpenID Connect), Spring Security |
| **AI** | Google Gemini API |

---

## ✨ Features

- 🔐 **Secure Authentication** — OAuth2 + PKCE flow via Keycloak. The API Gateway validates JWTs centrally; no service handles auth independently.
- 📊 **Activity Tracking** — Log workouts with type, duration, calories burned, start time, and custom metrics (pace, heart rate, etc.).
- 🤖 **AI-Powered Recommendations** — Every logged activity is sent to Google Gemini, which provides:
  - **Performance Analysis** (overall, pace, heart rate, calories)
  - **Improvement Areas** with detailed recommendations
  - **Next Workout Suggestions**
  - **Safety Guidelines**
- ⚡ **Event-Driven Design** — Activity Service publishes events to Kafka. AI Service consumes them asynchronously — keeping services fully decoupled.
- 🔍 **Service Discovery** — Eureka-based dynamic discovery with load-balanced routing.
- ⚙️ **Centralized Config** — All service configurations are managed by Spring Cloud Config Server.
- 📱 **Reactive Frontend** — React SPA with protected routes, global auth state via Redux, and MUI components.

---

<div align="center">

**Built with ❤️ using Spring Boot, Apache Kafka, Google Gemini, and React**

</div>
