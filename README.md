# API Authentication Fundamentals

## Assignment Overview

This project demonstrates API authentication fundamentals using a small Node.js and Express API. It implements token-based authentication with JSON Web Tokens (JWT) and includes a Postman collection for testing protected endpoints.

## Learning Objectives

- Understand why API authentication is important.
- Compare token-based authentication and OAuth.
- Implement JWT-based authentication.
- Protect API endpoints with middleware.
- Test successful and failed authentication requests in Postman.
- Identify API security best practices and common implementation pitfalls.

## Authentication Concepts

### 1. Authentication vs Authorization

**Authentication** verifies who a user or application is. For example, a login request checks a username and password.

**Authorization** determines what an authenticated user is allowed to access. In this project, `/api/profile` is authorized only when a valid Bearer token is supplied.

### 2. Token-Based Authentication

In token-based authentication, a client first authenticates and receives a token. The client then sends the token with later requests, commonly using:

`Authorization: Bearer <token>`

This project uses JWT. The server signs a token after successful login and verifies that token in middleware before allowing access to protected routes.

### 3. OAuth 2.0

OAuth 2.0 is an authorization framework commonly used when an application needs controlled access to resources on behalf of a user. For example, a user can authorize a third-party application to access selected Google or GitHub resources without giving that application their password.

OAuth is especially useful for delegated access and integrations. It is broader than simply creating a login token for an application's own API.

## Real-World Examples

- **Bearer/JWT tokens:** SPAs and mobile applications often use access tokens to call backend APIs after authentication.
- **OAuth 2.0:** A calendar application may ask a user to authorize access to their Google Calendar through an OAuth consent flow.
- **API keys:** Server-to-server services may use API keys for identifying an application, although API keys alone should not be treated as a complete user authentication solution.

## Project Endpoints

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| GET | `/` | API information | None |
| POST | `/login` | Authenticate demo user and issue JWT | Username/password |
| GET | `/api/profile` | Protected profile resource | Bearer token |
| GET | `/api/security-test` | Protected security test | Bearer token |

## Run the Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The API runs at:

`http://localhost:3000`

## Demo Login

For this classroom demonstration only:

```text
Username: student
Password: Password123!
```

Do not use these credentials in a real application.

## Postman Testing

Import:

`postman/API-Authentication-Demo.postman_collection.json`

### Test 1: Login

Send `POST /login` with:

```json
{
  "username": "student",
  "password": "Password123!"
}
```

Copy the returned JWT into the Postman collection variable named `token`.

### Test 2: Valid Token

Send:

`GET /api/profile`

with:

`Authorization: Bearer <token>`

Expected result: HTTP 200.

### Test 3: No Token

Send the protected endpoint without an Authorization header.

Expected result: HTTP 401.

### Test 4: Invalid Token

Send:

`Authorization: Bearer invalid-token`

Expected result: HTTP 403.

## Security Best Practices

1. Use HTTPS/TLS so credentials and tokens are encrypted in transit.
2. Store passwords using strong, salted password hashing such as Argon2 or bcrypt.
3. Keep JWT secrets and API credentials in environment variables or a secret manager.
4. Use short-lived access tokens and rotate/revoke credentials where appropriate.
5. Validate request input and return safe error messages.
6. Apply rate limiting and monitoring to authentication endpoints.
7. Use least-privilege authorization scopes and roles.
8. Avoid putting sensitive information inside JWT payloads because JWT payloads are encoded, not encrypted.
9. Never commit `.env` files or production secrets to GitHub.
10. Keep dependencies updated and audit them regularly.

## Common Pitfalls

- Sending tokens over HTTP instead of HTTPS.
- Hard-coding production secrets.
- Using long-lived tokens without a revocation strategy.
- Storing passwords in plain text.
- Treating authentication as authorization.
- Putting passwords or sensitive data into URLs.
- Returning overly detailed login errors that help attackers enumerate accounts.
- Forgetting to validate token expiry and signature.
- Assuming a JWT is encrypted simply because it is encoded.

## Security Testing Checklist

- [x] Login succeeds with correct credentials.
- [x] Login fails with incorrect credentials.
- [x] Protected endpoint accepts a valid token.
- [x] Protected endpoint rejects missing tokens.
- [x] Protected endpoint rejects invalid tokens.
- [x] Token expiry is configured.
- [x] Production secret warning is documented.

## Limitations of This Classroom Demo

This project intentionally uses an in-memory demo user and a development fallback secret so that it is easy to run locally. A production application should use a database, password hashing, a strong secret stored outside source control, HTTPS, rate limiting, logging/monitoring, and a complete authorization model.

## GitHub Submission

Recommended repository name:

`api-authentication-fundamentals`

Suggested assignment title:

**API Authentication Fundamentals – JWT Token Authentication**

After pushing the project to GitHub, submit the repository URL in the assignment's Link field.
