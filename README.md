🔐 Auth Service – Node.js

A production-ready authentication microservice built with Node.js, Express, JWT, following clean architecture and separation of concerns.
This service can be used as a standalone auth server or plugged into larger microservice-based systems.

🚀 Features

User Registration & Login

JWT-based Authentication

Password Hashing (bcrypt)

Route Protection Middleware

Centralized Error Handling

Request Validation

Swagger API Documentation

Docker Support

Unit Tests (Jest)

🛠 Tech Stack

Node.js

Express.js

JWT (JSON Web Tokens)

bcrypt

MySQL / MongoDB (configurable)

Swagger (OpenAPI)

Docker

Jest

📁 Project Structure
auth-service-nodejs/
├── .env.example              # Environment variables template
├── .gitignore
├── Dockerfile                # Docker configuration
├── package.json
├── README.md
├── swagger.yaml              # API documentation
│
├── src/
│   ├── app.js                # Express app configuration
│   ├── server.js             # Application entry point
│   │
│   ├── config/               # App configurations
│   │   ├── db.js
│   │   ├── env.js
│   │   └── jwt.js
│   │
│   ├── controllers/          # Request handling logic
│   │   └── auth.controller.js
│   │
│   ├── middlewares/          # Custom middlewares
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/               # Database models
│   │   └── user.model.js
│   │
│   ├── repositories/         # Database access layer
│   │   └── user.repository.js
│   │
│   ├── routes/               # API routes
│   │   └── auth.routes.js
│   │
│   ├── services/             # Business logic
│   │   └── auth.service.js
│   │
│   ├── utils/                # Helper utilities
│   │   ├── hash.util.js
│   │   └── response.util.js
│   │
│   └── validations/          # Request validation schemas
│       └── auth.validation.js
│
└── tests/                    # Unit & integration tests
    └── auth.test.js

🔑 API Endpoints
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register new user	❌
POST	/api/auth/login	Login user	❌
GET	/api/auth/me	Get logged-in user info	✅
⚙️ Environment Variables

Create a .env file using .env.example:

PORT=5000
DB_URL=your_database_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

🧪 Running Tests
npm test

🐳 Run with Docker
docker build -t auth-service .
docker run -p 5000:5000 auth-service

📖 Swagger Documentation

After running the server, access:

http://localhost:5000/api-docs

🎯 Use Cases

Authentication microservice for SaaS apps

Backend for web & mobile applications

Base auth system for microservice architecture

👨‍💻 Author

Utsab Ghosh
GitHub: https://github.com/Utsab96

⭐ Why this README works (important for you)

Looks real-world & scalable

Matches industry backend standards

ATS & recruiter friendly

Shows architecture thinking, not just CRUD

🔥 Next recommended steps

Add API flow diagram (JWT lifecycle)

Implement refresh tokens

Add rate limiting & role-based access

Write System Design explanation

Say “Next step” and we’ll build it properly.