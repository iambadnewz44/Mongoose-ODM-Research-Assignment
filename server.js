require("dotenv").config();

const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { MongoClient } = require("mongodb");
const { validateMessage } = require("./messageStore");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "chat-server" });
});

let messages = [];
let collection = null;
let mongoClient = null;

async function connectMongo() {
  if (!process.env.MONGODB_URI) return;
  mongoClient = new MongoClient(process.env.MONGODB_URI);
  await mongoClient.connect();
  const db = mongoClient.db(process.env.MONGODB_DB || "chat_demo");
  collection = db.collection("messages");
  messages = await collection.find().sort({ createdAt: 1 }).limit(100).toArray();
}

io.on("connection", (socket) => {
  socket.emit("chatHistory", messages);

  socket.on("chatMessage", async (payload, callback) => {
    try {
      const message = validateMessage(payload || {});
      messages.push(message);
      messages = messages.slice(-100);

      if (collection) {
        await collection.insertOne(message);
      }

      io.emit("chatMessage", message);
      if (callback) callback({ ok: true });
    } catch (error) {
      if (callback) callback({ ok: false, error: error.message });
    }
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  connectMongo()
    .then(() => server.listen(PORT, () => {
      console.log(`Chat server running on http://localhost:${PORT}`);
    }))
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

module.exports = { app, server, io };
