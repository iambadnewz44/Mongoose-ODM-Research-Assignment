import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "assignment-demo-secret-change-in-production";

app.use(express.json());

// Demo user only. Real applications should store hashed passwords in a database.
const demoUser = {
  id: 1,
  username: "student",
  password: "Password123!"
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ error: "Access token is required." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
  res.json({
    message: "API Authentication Fundamentals Demo",
    endpoints: {
      login: "POST /login",
      protected: "GET /api/profile"
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== demoUser.username || password !== demoUser.password) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign(
    { id: demoUser.id, username: demoUser.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Authentication successful.",
    token,
    token_type: "Bearer",
    expires_in: "1 hour"
  });
});

app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Protected resource accessed successfully.",
    user: req.user
  });
});

app.get("/api/security-test", authenticateToken, (req, res) => {
  res.json({
    message: "Security test passed: a valid Bearer token was accepted."
  });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});