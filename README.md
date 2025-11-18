# 🏥 Healthcare Tracker — React Frontend

A clean, responsive React frontend for the **Healthcare Tracking System** backend (Node.js + Express + MongoDB).  
This frontend lets **patients** track daily wellness goals and **providers** review patient progress.  
Built to be modular, secure (JWT + refresh tokens), and easy to extend.

---

## 🔥 Highlights

- Login / Register (patient & provider)
- Token-based authentication with access + refresh tokens
- Patient dashboard: steps, sleep, water logs
- CRUD operations for daily goals
- Provider dashboard: list patients, view dashboards, mark evaluations
- Fully responsive UI 

---

## 🧰 Tech Stack

- **React 18+**
- **React Router**
- **Axios**
- **Tailwind CSS**




# 🔒 Healthcare Tracking System – Backend (Node.js + Express + MongoDB)

A secure and modular backend built using Node.js, Express, MongoDB, JWT Authentication, and Mongoose.  
This backend powers a healthcare system where *patients* can track daily wellness goals, and *providers* can monitor patient progress.



# 🚀 Features

## 👤 User & Auth Module
- User registration (patient / provider)
- Login with JWT access token + refresh token
- Logout (invalidates refresh token)
- Role-based authorization
- Password hashing using bcrypt

## 🧑‍⚕ Patient Module
- View & update profile  
- Log wellness goals:
  - Steps  
  - Sleep hours  
  - Water intake  

- Get "Health Tip of the Day" (generated using Gemini)

## 👨‍⚕ Provider Module
- View list of patients  
- Open patient dashboards  
- Mark patient evaluations  
- View patient history  

## 🎯 Goal Tracking Module
- Add daily logs  
- Update logs  
- Delete logs  
- Provider compliance checking  


# 🧩 Authentication System (JWT + Refresh Token)

### 🔐 Registration Fields
- username
- email
- password
- role → "patient" or "provider"

### 🔑 Login Fields
- email
- password

### 🎫 Tokens Issued
- *Access Token* (short-lived)
- *Refresh Token* (stored in DB)

### 🔍 Middlewares
| Middleware | Purpose |
|------------|---------|
| auth.middleware.js | Validate JWT token |


---

# 📚 API Routes Overview

## 🔐 Auth Routes

| Method | Endpoint              | Description |
|--------|------------------------|-------------|
| POST   | /auth/register       | Register user |
| POST   | /auth/login          | Login user & return tokens |
| POST   | /auth/logout         | Invalidate refresh token |
| POST   | /auth/refresh-token  | Generate new access token |

---

## 👤 Patient Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /patient/profile     | Get profile |
| PUT    | /patient/profile     | Update profile |
| GET    | /patient/goals       | Get patient goals |

---

## 🎯 Goal Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /goals          | Add goal log |
| GET    | /goals/:id      | Get a goal |
| PUT    | /goals/:id      | Update goal |
| DELETE | /goals/:id      | Delete goal |

---

## 🧑‍⚕ Provider Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /provider/patients            | List all patients |
| GET    | /provider/patient/:id         | Patient dashboard |



# 🗂 Modules Breakdown

## 🔐 Authentication Module
Files:
src/controllers/auth.controller.js
src/routes/auth.routes.js
src/services/auth.service.js
src/middleware/auth.middleware.js


Handles:
- Register
- Login
- Logout
- Tokens
- Role checks

---

## 👤 Patient Module

Files:
src/controllers/patient.controller.js
src/routes/patient.routes.js
src/services/patient.service.js
src/models/Profile.model.js


Features:
- Profile CRUD
- View progress

---

## 🧑‍⚕ Provider Module

Files:
src/controllers/provider.controller.js
src/routes/provider.routes.js
src/services/provider.service.js


Features:
- List patients
- Patient dashboard
- View compliance

---

## 🎯 Goal Module

Files:
src/models/Goal.model.js
src/controllers/goal.controller.js
src/routes/goal.routes.js
src/services/goal.service.js


Features:
- CRUD for goals
- Provider evaluation





