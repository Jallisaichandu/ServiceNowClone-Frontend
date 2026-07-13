# ServiceNow Clone - Frontend

A modern React-based frontend application that replicates the core functionalities of the ServiceNow Ticket Management System. The application provides an intuitive dashboard for administrators and users to manage tickets efficiently.

---

## Overview

The frontend communicates with the Spring Boot backend through REST APIs and provides a responsive interface for authentication, dashboard analytics, ticket management, user management, notifications, and profile management.

---

## Features

### Authentication

- Login
- JWT Authentication
- Session Management
- Logout

### Dashboard

- Dashboard Analytics
- Total Users
- Total Tickets
- Open Tickets
- Closed Tickets
- High Priority Tickets
- Assigned Tickets

### User Management

(Admin Only)

- View Users
- Create Users
- Update Users
- Delete Users

### Ticket Management

- Create Ticket
- Edit Ticket
- Delete Ticket
- Assign Ticket
- Ticket Status
- Ticket Priority
- Ticket History

### Notifications

- Ticket Update Notifications
- Ticket Closed Notifications
- Ticket Assignment Notifications

### Profile

- User Profile
- Update Profile Information

### Attachments

- Upload Attachments
- Download Attachments
- Delete Attachments

---

## Tech Stack

| Technology | Purpose |
|------------|----------|
| React.js | Frontend |
| Axios | API Communication |
| React Icons | UI Icons |
| CSS3 | Styling |
| Chart.js | Dashboard Charts |
| Vercel | Deployment |

---

## Folder Structure

```
src
 ├── components
 │     ├── Dashboard
 │     ├── Login
 │     ├── Navbar
 │     ├── Profile
 │     ├── Tickets
 │     ├── Users
 │     └── Signup
 │
 ├── pages
 ├── services
 ├── App.js
 ├── index.js
 └── App.css
```

---

## User Roles

### Admin

- Dashboard
- User Management
- Ticket Management
- Ticket Assignment
- Notifications
- Profile

### User

- Dashboard
- View Assigned Tickets
- Update Ticket Status
- Notifications
- Profile

---

## API Integration

Authentication

POST /auth/login

POST /auth/register

Users

GET /users

POST /users

PUT /users/{id}

DELETE /users/{id}

Tickets

GET /tickets

POST /tickets

PUT /tickets/{id}

DELETE /tickets/{id}

Attachments

POST /attachments/{ticketId}

GET /attachments/ticket/{ticketId}

GET /attachments/download/{id}

DELETE /attachments/{id}

---

## Deployment

Frontend is deployed using Vercel.

Backend APIs are hosted on Railway.

---

## Screenshots

Add screenshots here.

```
screenshots/
    login.png
    dashboard.png
    users.png
    tickets.png
    profile.png
```

## Future Improvements

- Dark Theme
- Mobile Responsive Design
- Email Verification
- Real-Time Notifications
- Password Reset
- Cloud Storage for Attachments
- Better Dashboard Analytics
- User Activity Logs

---

**Sai Chandu Jalli**

<img width="1310" height="727" alt="image" src="https://github.com/user-attachments/assets/f333a9ef-220e-431a-9b71-be883b1ed9fc" />
<img width="1359" height="767" alt="image" src="https://github.com/user-attachments/assets/80713762-1453-4064-a585-fcd9280b40fe" />
<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/045ccf35-c799-46f7-b8af-7a04f89fd11e" />
<img width="1314" height="725" alt="image" src="https://github.com/user-attachments/assets/65478ce2-2dec-48a2-b635-6a885d7cbfe4" />
<img width="1365" height="765" alt="image" src="https://github.com/user-attachments/assets/176abf90-c56a-4b51-bbce-2752ed2a14cc" />
![Uploading image.png…]()
