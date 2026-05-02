# API Reference

---

## Table of Contents

- [API Reference](#api-reference)
  - [Table of Contents](#table-of-contents)
    - [Authentication](#authentication)
    - [Endpoints](#endpoints)
      - [Users](#users)
      - [Resources](#resources)
    - [Example Request \& Response](#example-request--response)
    - [Error Format](#error-format)

---

Base Path: `/v1`

### Authentication

All protected routes require a Bearer token in the `Authorization` header:

```bash
Authorization: Bearer <token>
```

Alternatively, an API key can be passed as a query parameter:

```bash
/v1/{resource}?api_key=<api key>
```

or in the `x-api-key` header:

```bash
x-api-key: <api key>
```

### Endpoints

#### Users

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| `GET`  | `/users`                | lists user profiles        |
| `POST` | `/users`                | creates a new user         |
| `GET`  | `/users/{id}`           | retrieves a user’s profile |
| `Put`  | `/users/{id}`           | updates a user’s profile   |
| `GET`  | `/users/{id}/following` | lists a user’s following   |
| `GET`  | `/users/{id}/followers` | lists a user’s followers   |

#### Resources

| Method | Endpoint          | Description |
| ------ | ----------------- | ----------- |
| `GET`  | `/resource`       | temp        |
| `POST` | `/resource`       | temp        |
| `GET`  | `/resource/{id}`  | temp        |
| `Put`  | `/resource/{id}`  | temp        |
| `GET`  | `/resource/{id}/` | temp        |

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
