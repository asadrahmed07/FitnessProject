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

This is Spring Boot Microservice based application, consist of multiple microservices communicating between each other synchronously through WebClient and asynchronously through apache kafka.
For Frontend I am using React, I have also included a registry Eureka Server, a centralised property manager as Config server and for a AI Generated opinion on Workouts we are also communicating to Google Gemini open API. For Robut Identity and Access Management I have used KeyCloak(IAM).
All these microservices interacted with Frontend through and API-Gateway, for better understanding refere below flow diagram:

<img width="1471" height="748" alt="image" src="https://github.com/user-attachments/assets/80a7ef52-a9c7-4d19-b03d-4b2d883150df" />


<br/>

> Track your workouts. Get instant AI-powered analysis. Improve every session.

<br/>

<img width="1918" height="617" alt="FitTrack Architecture Diagram" src="https://github.com/user-attachments/assets/eb1407ee-4926-4b97-8d35-01e97f5ad89e" />

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Services](#-services)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Communication Flow](#-communication-flow)

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

### Backend
| Technology | Purpose |
|---|---|
| **Java 17** | Core language |
| **Spring Boot 3.5.7** | Application framework |
| **Spring Cloud 2025.0.0** | Microservices toolkit (Gateway, Config, Eureka) |
| **Spring Cloud Netflix Eureka** | Service discovery |
| **Spring Cloud Config** | Centralized configuration |
| **Spring Cloud Gateway (WebFlux)** | Reactive API Gateway |
| **Spring WebFlux / WebClient** | Reactive inter-service HTTP calls |
| **Spring Data JPA + Hibernate** | ORM for PostgreSQL (User Service) |
| **Spring Data MongoDB** | Document persistence (Activity + AI Service) |
| **Spring Kafka** | Async event streaming |
| **Spring Security OAuth2** | JWT-based resource server security |
| **Lombok** | Boilerplate reduction |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 7** | Lightning-fast build tool |
| **Material UI (MUI) 7** | Component library |
| **Redux Toolkit** | Global state management |
| **React Router 7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **react-oauth2-code-pkce** | OAuth2 Authorization Code + PKCE flow |

### Infrastructure & AI
| Technology | Purpose |
|---|---|
| **PostgreSQL** | Relational database for user data |
| **MongoDB** | NoSQL database for activities & recommendations |
| **Apache Kafka** | Event streaming between Activity → AI Service |
| **Keycloak** | Identity provider (OAuth2 / OpenID Connect) |
| **Google Gemini API** | AI-powered fitness recommendations |

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
- 🔍 **Service Discovery** — Eureka-based dynamic discovery with load-balanced routing (`lb://SERVICE-NAME`).
- ⚙️ **Centralized Config** — All service configurations are managed by Spring Cloud Config Server.
- 📱 **Reactive Frontend** — React SPA with protected routes, global auth state via Redux, and MUI components.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Java 17+** — [Download](https://adoptium.net/)
- **Maven 3.9+** — [Download](https://maven.apache.org/download.cgi)
- **Node.js 20+** & **npm** — [Download](https://nodejs.org/)
- **PostgreSQL** — Running on port `5432`
- **MongoDB** — Running on port `27017`
- **Apache Kafka** — Running on port `9092` (with Zookeeper)
- **Keycloak** — Running on port `8181`, with a realm named `fitness-app`
- **Google Gemini API Key** — [Get yours here](https://aistudio.google.com/app/apikey)

### Environment Variables

The **AI Service** requires two environment variables for the Gemini integration:

```bash
export GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
export GEMINI_KEY="YOUR_GEMINI_API_KEY"
```

> **Note:** The `user-service.yml` config contains a hardcoded PostgreSQL password. For production, replace it with a secrets manager or environment variable.

### Running the Application

Start services **in this order** to respect dependencies:

#### 1. Infrastructure — Start Config Server
```bash
cd configserver
./mvnw spring-boot:run
```

#### 2. Infrastructure — Start Eureka Server
```bash
cd eureka
./mvnw spring-boot:run
# Available at http://localhost:8761
```

#### 3. Backend Services (can be run in parallel after step 1 & 2)
```bash
# User Service
cd userservice && ./mvnw spring-boot:run

# Activity Service
cd activityservice && ./mvnw spring-boot:run

# AI Service (remember to set GEMINI_URL and GEMINI_KEY)
cd aiservice && ./mvnw spring-boot:run
```

#### 4. API Gateway
```bash
cd gateway
./mvnw spring-boot:run
# Available at http://localhost:8080
```

#### 5. Frontend
```bash
cd fitness-frontend
npm install
npm run dev
# Available at http://localhost:5173
```

---

## 📡 API Reference

All requests go through the API Gateway at `http://localhost:8080`.  
Protected routes require a valid `Authorization: Bearer <JWT>` header (set by the gateway using Keycloak JWT).

### User Service — `/api/users`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Register a new user |
| `GET` | `/api/users/{userId}` | Get user profile |
| `GET` | `/api/users/{userId}/validate` | Check if a user exists (internal) |

**Register Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

### Activity Service — `/api/activities`

> Requires `X-User-ID` header (injected by Gateway from JWT token).

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/activities` | Log a new activity |
| `GET` | `/api/activities` | Get all activities for the authenticated user |

**Track Activity Request Body:**
```json
{
  "type": "RUNNING",
  "duration": 45,
  "caloriesBurned": 450,
  "startTime": "2026-03-03T10:00:00",
  "additionalMetrics": {
    "pace": "5:30/km",
    "distance": "8.2km",
    "avgHeartRate": 155
  }
}
```

---

### AI Service — `/api/recommendations`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/recommendations/{activityId}` | Get AI recommendation for a specific activity |

**Sample Recommendation Response:**
```json
{
  "activityId": "abc123",
  "userId": "user456",
  "type": "RUNNING",
  "recommendation": "Overall: Great session...\nPace: Your pace was consistent...",
  "improvements": ["Endurance: Consider interval training..."],
  "suggestions": ["Tempo Run: A 30-minute tempo run at threshold pace..."],
  "safety": ["Always warm up for 5 minutes", "Stay hydrated"],
  "createdAt": "2026-03-03T10:05:00"
}
```

---

## 📁 Project Structure

```
FitnessProject/
│
├── 📦 configserver/                    # Spring Cloud Config Server
│   └── src/main/resources/config/
│       ├── user-service.yml
│       ├── activity-service.yml
│       ├── ai-service.yml
│       └── gateway-service.yml
│
├── 📦 eureka/                          # Netflix Eureka Service Registry
│
├── 📦 gateway/                         # Spring Cloud Gateway + OAuth2
│
├── 📦 userservice/                     # User Management Service
│   └── src/main/java/com/fitness/userservice/
│       ├── controller/UserController.java
│       ├── services/UserService.java
│       ├── models/User.java            # JPA Entity (PostgreSQL)
│       ├── models/UserRole.java
│       ├── dto/RegisterRequest.java
│       └── repository/UserRepository.java
│
├── 📦 activityservice/                 # Activity Tracking Service
│   └── src/main/java/com/fitness/activityservice/
│       ├── controller/ActivityController.java
│       ├── service/ActivityService.java        # Kafka Producer
│       ├── service/UserValidationService.java  # WebClient → User Service
│       ├── model/Activity.java                 # MongoDB Document
│       ├── model/ActivityType.java
│       └── config/WebClientConfig.java
│
├── 📦 aiservice/                       # AI Recommendation Service
│   └── src/main/java/com/fitness/aiservice/
│       ├── service/ActivityMessageListener.java  # Kafka Consumer
│       ├── service/ActivityAIService.java        # Prompt builder & parser
│       ├── service/GeminiService.java            # Gemini API WebClient
│       ├── service/RecommendationService.java
│       ├── controller/RecommendationController.java
│       └── model/Recommendation.java            # MongoDB Document
│
└── 📦 fitness-frontend/                # React SPA
    └── src/
        ├── App.jsx                     # Auth gate + routing
        ├── components/
        │   ├── ActivityList.jsx        # Workout cards grid
        │   ├── ActivityForm.jsx        # Log new activity
        │   └── ActivityDetail.jsx      # Activity + AI recommendation view
        ├── store/authSlice.js          # Redux auth state
        └── services/api.js             # Axios API client
```

---

## 🔄 Communication Flow

Here's how a complete activity-tracking cycle works end-to-end:

```
1. User logs in via Keycloak (OAuth2 PKCE flow in React)
   └── Receives JWT token → stored in Redux state

2. User submits a workout form (POST /api/activities)
   └── Gateway validates JWT → extracts User ID → passes as X-User-ID header

3. Activity Service receives the request
   ├── UserValidationService calls User Service via WebClient (sync)
   │   └── GET /api/users/{userId}/validate → returns boolean
   ├── Saves Activity document to MongoDB
   └── Publishes Activity event to Kafka topic: [activity-events]

4. AI Service consumes the Kafka event (async)
   ├── ActivityMessageListener picks up the event
   ├── ActivityAIService builds a structured JSON prompt
   ├── GeminiService calls Google Gemini API via WebClient
   ├── Response is parsed → Recommendation object built
   └── Recommendation is saved to MongoDB

5. User clicks on an activity → sees full AI recommendation
   └── GET /api/recommendations/{activityId} → AI Service returns analysis
```

---

<div align="center">

**Built with ❤️ using Spring Boot, Apache Kafka, Google Gemini, and React**

</div>
