# API Authentication Fundamentals — Assignment Report

## 1. Introduction

API authentication is the process of verifying the identity of a user, service, or application before allowing access to protected resources. It is important because APIs often provide access to private information and business operations. Without authentication, unauthorized clients could access or modify protected data.

Authentication should be combined with authorization, which determines what an authenticated identity is allowed to do.

## 2. Token-Based Authentication

Token-based authentication allows a client to authenticate once and receive a token. The client includes that token with subsequent API requests.

A common HTTP format is:

`Authorization: Bearer <access-token>`

In this project, JSON Web Token (JWT) is used. After valid credentials are supplied to `POST /login`, the server signs a JWT containing a small amount of user information and an expiration time. The protected endpoint uses middleware to verify the token's signature and validity.

### Flow

1. Client sends username and password.
2. Server verifies the credentials.
3. Server creates a signed JWT.
4. Client stores the access token appropriately.
5. Client sends the token in the Authorization header.
6. Server verifies the token.
7. If valid, the protected resource is returned.

## 3. OAuth 2.0

OAuth 2.0 is an authorization framework for delegated access. It allows a resource owner to grant an application limited access to resources without sharing the resource owner's password with that application.

For example, a third-party application could request permission to read a user's Google Calendar. The user authenticates with the authorization provider and approves requested scopes. The application receives an access token and uses it to call the permitted API.

OAuth is particularly useful for third-party integrations, delegated access, and single sign-on ecosystems. It should not be confused with a simple custom username/password login system.

## 4. Comparison

| Feature | JWT Token Authentication | OAuth 2.0 |
|---|---|---|
| Main purpose | Carry authenticated claims between client and API | Delegated authorization |
| Typical use | First-party API access | Third-party integrations |
| Token | Often JWT | Usually access token; format depends on provider |
| Consent flow | Usually not required | Common in delegated access |
| Example | SPA calling its own backend | App accessing a user's Google resources |

## 5. Implementation

The project contains:

- `src/server.js` — Express API and JWT authentication middleware.
- `postman/API-Authentication-Demo.postman_collection.json` — Postman requests.
- `README.md` — setup instructions, concepts, best practices, and pitfalls.

The `/api/profile` route is protected by `authenticateToken` middleware. Missing tokens produce HTTP 401, while invalid or expired tokens produce HTTP 403.

## 6. Postman Security Tests

The Postman collection demonstrates:

1. Successful login and token generation.
2. Access using a valid Bearer token.
3. Access without a token.
4. Access with an invalid token.

These tests demonstrate that the protected endpoint is not publicly accessible.

## 7. Security Best Practices

A production API should:

- Use HTTPS.
- Hash passwords with a modern password-hashing algorithm.
- Keep secrets outside source code.
- Use short-lived access tokens.
- Validate input.
- Rate-limit authentication attempts.
- Apply least privilege.
- Monitor authentication events.
- Avoid exposing sensitive data in tokens.
- Keep dependencies updated.

## 8. Common Pitfalls

Common mistakes include hard-coded secrets, plain-text passwords, transmitting credentials without TLS, overly long token lifetimes, weak authorization checks, and assuming that a signed JWT is encrypted.

## 9. Conclusion

API authentication protects resources by ensuring that requests come from recognized identities. Token-based authentication is useful for many first-party API scenarios, while OAuth 2.0 is designed for delegated authorization and third-party access. Hands-on testing with Postman makes it possible to verify both successful authentication and failure cases, which is an important part of API security.
