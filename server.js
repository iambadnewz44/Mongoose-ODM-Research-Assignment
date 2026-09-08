// Express.js Complete Assignment
// Library REST API

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware for JSON request bodies
app.use(express.json());

// Simple request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// In-memory sample data
let books = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
    available: true
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Romance",
    available: true
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: "Fantasy",
    available: false
  }
];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Express.js Library API",
    endpoints: [
      "GET /api/books",
      "GET /api/books/:id",
      "GET /api/books/search?genre=Fantasy",
      "POST /api/books",
      "PUT /api/books/:id",
      "DELETE /api/books/:id"
    ]
  });
});

// Get all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Search books by genre
app.get("/api/books/search", (req, res) => {
  const genre = req.query.genre;

  if (!genre) {
    return res.status(400).json({
      error: "Please provide a genre query parameter"
    });
  }

  const results = books.filter(
    (book) => book.genre.toLowerCase() === genre.toLowerCase()
  );

  res.json(results);
});

// Get one book
app.get("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      error: "Book not found"
    });
  }

  res.json(book);
});

// Validation middleware
function validateBook(req, res, next) {
  const { title, author, year, genre } = req.body;

  if (!title || !author || !year || !genre) {
    return res.status(400).json({
      error: "title, author, year and genre are required"
    });
  }

  if (!Number.isInteger(Number(year))) {
    return res.status(400).json({
      error: "year must be a valid number"
    });
  }

  next();
}

// Create a book
app.post("/api/books", validateBook, (req, res) => {
  const { title, author, year, genre, available = true } = req.body;

  const newBook = {
    id: books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1,
    title,
    author,
    year: Number(year),
    genre,
    available
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// Update a book
app.put("/api/books/:id", validateBook, (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Book not found"
    });
  }

  const { title, author, year, genre, available = true } = req.body;

  books[index] = {
    id,
    title,
    author,
    year: Number(year),
    genre,
    available
  };

  res.json(books[index]);
});

// Delete a book
app.delete("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Book not found"
    });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.json({
    message: "Book deleted successfully",
    book: deletedBook
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
