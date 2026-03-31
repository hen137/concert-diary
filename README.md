# Concert Diary API

A backend proof of concept for a Concert Diary app, inspired by the Letterboxd community, designed for music lovers

---

## 📖 Table of Contents

- [Concert Diary API](#concert-diary-api)
  - [📖 Table of Contents](#-table-of-contents)
  - [Project Overview](#project-overview)
  - [Core Features](#core-features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [.env Configuration](#env-configuration)
    - [Running the Server](#running-the-server)
  - [API Reference](#api-reference)
    - [Authentication](#authentication)
    - [Endpoints](#endpoints)
      - [Users](#users)
      - [Resources](#resources)
    - [Example Request \& Response](#example-request--response)
    - [Error Format](#error-format)
  - [Project Structure](#project-structure)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Docker](#docker)
    - [Environment Variables (Production)](#environment-variables-production)
  - [License](#license)

---

## Project Overview

This project is the first step of many in the development of a Concert Diary app for music lovers to review and catalog their concert experiences. Users will be able to engage with their local music scene and continue to discover new sonic experiences!

Many platforms allow concert goers to manage tickets, explore upcoming shows, or even offer archival features, but for casual musicheads and lifelong audiophiles alike there hasn't been any way to catalog and reflect on modern musical experiences. If you're excited for your first concert, dressing up for a symphony, or even attending your buddy's gig wouldn't you want to tell the people how it went? That's what we want too :)

---

## Core Features

- User Profiles — brief description
- Event and Venue Discovery — brief description
- Rate/Review Events and Venues — brief description
- Authentication & authorization (e.g., JWT / OAuth 2.0)
- Rate limiting & request validation
- Comprehensive error handling

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js 20 |
| Framework | Fastify |
| Database | PostgreSQL |
| Auth | JWT / OAuth 2.0 |
| Testing | Jest + Supertest |
| CI/CD | GitHub Actions |
| Containerization | Docker / Docker Compose |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.x
- [Docker](https://www.docker.com/) >= 24.x
- [Git](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hen137/concert-diary.git
cd concert-diary
 
# 2. Install dependencies
pnpm install
```

### .env Configuration

Create a `.env` with the following values:

```env
# Server
PORT=3000
NODE_ENV=development
 
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/database

# INSERT MORE
```

### Running the Server

**Local (without Docker)**

```bash
pnpm run dev
```

**With Docker Compose**

```bash
docker compose up --build
```

The API will be available at `http://localhost:3000`.

---

## API Reference

**PUT THIS SECTION IN ANOTHER MD FILE**

Base Path: `/v1`

### Authentication

All protected routes require a Bearer token in the `Authorization` header:

```bash
Authorization: Bearer <token>
```

### Endpoints

#### Users

| Method | Endpoint | Description |
| -------- | ---------- | ------------- |
| `GET` | `/users` | lists user profiles |
| `POST` | `/users` | creates a new user |
| `GET` | `/users/{id}` | retrieves a user’s profile |
| `Put` | `/users/{id}` | updates a user’s profile |
| `GET` | `/users/{id}/following` | lists a user’s following |
| `GET` | `/users/{id}/followers` | lists a user’s followers |

#### Resources

| Method | Endpoint | Description |
| -------- | ---------- | ------------- |
| `GET` | `/resource` | temp |
| `POST` | `/resource` | temp |
| `GET` | `/resource/{id}` | temp |
| `Put` | `/resource/{id}` | temp |
| `GET` | `/resource/{id}/` | temp |

### Example Request & Response

**`POST /auth/login`**

```bash
curl -X POST https://api.yourproject.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "user@example.com", "password": "secret" }'
```

```json
{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 604800
  }
}
```

### Error Format

All errors follow a consistent shape:

```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "The requested resource does not exist.",
  "details": {}
}
```

> 📄 Full interactive docs available at `/docs` (Swagger UI) when running locally.

---

## Project Structure

```bash
concert-diary/
├── db-seed/
│   └── utils/          # seeding utilities
├── sql/                # sql scripts for database seeding
├── src/
│   ├── hooks/          # lifecycle hooks
│   ├── plugins/        # fastify plugin logic
│   ├── routes/         # routes
│   ├── schemas/        # fastify schemas
│   ├── types/          # typescript types
│   └── utils/          # utilities
├── tests/
│   ├── unit/
│   ├── integration/
│   └── utils/
├── docker-compose.yaml
├── Dockerfile
└── README.md
```

---

## Testing

```bash
# Run all tests
pnpm test
 
# Run with coverage report
pnpm run test:coverage
 
# Run only unit tests
pnpm run test:unit
 
# Run only integration tests
pnpm run test:integration
```

---

## Deployment

### Docker

```bash
docker build -t your-repo:latest .
docker run -p 3000:3000 --env-file .env your-repo:latest
```

### Environment Variables (Production)

Ensure the following are set in your production environment:

| Variable | Required | Description |
| ---------- | ---------- | ------------- |
| `DATABASE_URL` | | Full database connection string |
| `JWT_SECRET` | | Strong random secret (min 32 chars) |
| `NODE_ENV` | | Set to `production` |
| `PORT` | ❌ | Defaults to `3000` |

---

## License

Distributed under the [MIT License](LICENSE)
