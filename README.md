# Concert Diary API

## Project Overview

This project is a development challenge I've given myself to learn how RESTful APIs are designed, built, and hardened for robust production deployment. The service itself will allow its users to catalog and review the concerts they've attended - **a webapp is in the works** - all data is served in JSON format for the time being.

---

## Table of Contents

- [Concert Diary API](#concert-diary-api)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Core Features](#core-features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [.env Configuration](#env-configuration)
    - [Running the Server](#running-the-server)
  - [Project Structure](#project-structure)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Docker](#docker)
    - [Environment Variables (Production)](#environment-variables-production)
  - [License](#license)

---

## Core Features

- User Profiles: manage personal account details
- Event & Venue Discovery: explore musical events based on your location and custom filters
- Rate & Review: log and catalog the events you attend
- Authentication & Authorization: User Credentials and API Keys support based on OAuth 2.0 standards
- Rate limiting & request validation

<!-- --- -->

## Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Runtime          | Node.js 20              |
| Web Framework    | Fastify                 |
| Database         | PostgreSQL              |
| Auth             | JWT / OAuth 2.0         |
| Testing          | Vitest + Supertest      |
| CI/CD            | GitHub Actions          |
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

## Project Structure

```bash
concert-diary/
├── configs/            # config files
├── database/           # database management
│   ├── db-seed/        # seeding scripts
│   │   └── utils/      # seeding utilities
│   ├── docker/         # database containers
│   └── sql/            # sql schemas & scripts
├── docker/             # server containerization
├── src/
│   ├── plugins/        # fastify plugins
│   ├── routes/         # routes
│   ├── schemas/        # route schemas
│   ├── types/          # typescript types
│   └── utils/          # utilities
├── tests/
│   ├── integration/    # integration tests
│   │   └── routes/     # route tests
│   ├── unit/           # unit tests
│   │   └── utils/      # utility tests
│   └── utils/          # test utilities
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

| Variable       | Required | Description                         |
| -------------- | -------- | ----------------------------------- |
| `DATABASE_URL` |          | Full database connection string     |
| `JWT_SECRET`   |          | Strong random secret (min 32 chars) |
| `NODE_ENV`     |          | Set to `production`                 |
| `PORT`         | ❌       | Defaults to `3000`                  |

---

## License

Distributed under the [MIT License](LICENSE)
