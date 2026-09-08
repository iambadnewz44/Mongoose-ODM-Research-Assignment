// MongoDB Fundamentals Assignment
// Library Management System
// Database: libraryDB

// --------------------------------------------------
// 1. Select database
// --------------------------------------------------

use libraryDB

// --------------------------------------------------
// 2. Optional cleanup for repeatable execution
// --------------------------------------------------

db.books.drop()
db.authors.drop()
db.genres.drop()

// --------------------------------------------------
// 3. Create collections
// --------------------------------------------------

db.createCollection("books")
db.createCollection("authors")
db.createCollection("genres")

// --------------------------------------------------
// 4. Insert authors
// --------------------------------------------------

db.authors.insertMany([
  {
    _id: 1,
    name: "J.K. Rowling",
    country: "United Kingdom",
    birthYear: 1965
  },
  {
    _id: 2,
    name: "George Orwell",
    country: "United Kingdom",
    birthYear: 1903
  },
  {
    _id: 3,
    name: "Jane Austen",
    country: "United Kingdom",
    birthYear: 1775
  },
  {
    _id: 4,
    name: "Ernest Hemingway",
    country: "United States",
    birthYear: 1899
  },
  {
    _id: 5,
    name: "Haruki Murakami",
    country: "Japan",
    birthYear: 1949
  }
])

// --------------------------------------------------
// 5. Insert genres
// --------------------------------------------------

db.genres.insertMany([
  {
    _id: 1,
    name: "Fantasy",
    description: "Stories involving magical or imaginary worlds."
  },
  {
    _id: 2,
    name: "Dystopian",
    description: "Stories describing an imagined society with serious problems."
  },
  {
    _id: 3,
    name: "Romance",
    description: "Stories focusing on relationships and love."
  },
  {
    _id: 4,
    name: "Literary Fiction",
    description: "Fiction focused on character development and themes."
  },
  {
    _id: 5,
    name: "Contemporary",
    description: "Modern stories dealing with present-day situations."
  }
])

// --------------------------------------------------
// 6. Insert books
// --------------------------------------------------

db.books.insertMany([
  {
    _id: 101,
    title: "Harry Potter and the Philosopher's Stone",
    authorId: 1,
    genreId: 1,
    publicationYear: 1997,
    price: 450,
    available: true
  },
  {
    _id: 102,
    title: "1984",
    authorId: 2,
    genreId: 2,
    publicationYear: 1949,
    price: 350,
    available: true
  },
  {
    _id: 103,
    title: "Pride and Prejudice",
    authorId: 3,
    genreId: 3,
    publicationYear: 1813,
    price: 300,
    available: false
  },
  {
    _id: 104,
    title: "The Old Man and the Sea",
    authorId: 4,
    genreId: 4,
    publicationYear: 1952,
    price: 280,
    available: true
  },
  {
    _id: 105,
    title: "Norwegian Wood",
    authorId: 5,
    genreId: 5,
    publicationYear: 1987,
    price: 400,
    available: true
  },
  {
    _id: 106,
    title: "Animal Farm",
    authorId: 2,
    genreId: 2,
    publicationYear: 1945,
    price: 250,
    available: true
  }
])

// --------------------------------------------------
// 7. CREATE operation
// --------------------------------------------------

db.books.insertOne({
  _id: 107,
  title: "The Hobbit",
  authorId: 1,
  genreId: 1,
  publicationYear: 1937,
  price: 375,
  available: true
})

// Verify insertion
db.books.findOne({ _id: 107 })

// --------------------------------------------------
// 8. READ operations
// --------------------------------------------------

// Display all books
db.books.find()

// Display all authors
db.authors.find()

// Display all genres
db.genres.find()

// Find one book
db.books.findOne({
  title: "1984"
})

// --------------------------------------------------
// 9. UPDATE operations
// --------------------------------------------------

// Update availability
db.books.updateOne(
  { _id: 103 },
  { $set: { available: true } }
)

// Increase the price of Animal Farm
db.books.updateOne(
  { _id: 106 },
  { $set: { price: 275 } }
)

// --------------------------------------------------
// 10. SEARCH QUERIES
// --------------------------------------------------

// Search exact title
db.books.find({
  title: "1984"
})

// Books published after 1950
db.books.find({
  publicationYear: { $gt: 1950 }
})

// Books published before 1950
db.books.find({
  publicationYear: { $lt: 1950 }
})

// Books priced between 300 and 450
db.books.find({
  price: { $gte: 300, $lte: 450 }
})

// Available books
db.books.find({
  available: true
})

// Fantasy books
db.books.find({
  genreId: 1
})

// Dystopian books
db.books.find({
  genreId: 2
})

// Books written by George Orwell
db.books.find({
  authorId: 2
})

// --------------------------------------------------
// 11. AUTHOR SEARCH QUERIES
// --------------------------------------------------

// Search author by exact name
db.authors.find({
  name: "George Orwell"
})

// Authors from the United Kingdom
db.authors.find({
  country: "United Kingdom"
})

// Authors born after 1900
db.authors.find({
  birthYear: { $gt: 1900 }
})

// Search author names containing "George"
db.authors.find({
  name: { $regex: /George/i }
})

// --------------------------------------------------
// 12. REGEX BOOK SEARCH
// --------------------------------------------------

// Find titles containing "the"
db.books.find({
  title: { $regex: /the/i }
})

// --------------------------------------------------
// 13. SORTING
// --------------------------------------------------

// Sort books by price, lowest first
db.books.find().sort({
  price: 1
})

// Sort books by price, highest first
db.books.find().sort({
  price: -1
})

// Sort by publication year
db.books.find().sort({
  publicationYear: 1
})

// --------------------------------------------------
// 14. LIMIT
// --------------------------------------------------

// Cheapest three books
db.books.find()
  .sort({ price: 1 })
  .limit(3)

// --------------------------------------------------
// 15. PROJECTION
// --------------------------------------------------

// Display only title and price
db.books.find(
  {},
  {
    _id: 0,
    title: 1,
    price: 1
  }
)

// --------------------------------------------------
// 16. AND / OR queries
// --------------------------------------------------

// Available books costing less than 400
db.books.find({
  $and: [
    { available: true },
    { price: { $lt: 400 } }
  ]
})

// Books published before 1950 OR costing less than 300
db.books.find({
  $or: [
    { publicationYear: { $lt: 1950 } },
    { price: { $lt: 300 } }
  ]
})

// --------------------------------------------------
// 17. AGGREGATION
// --------------------------------------------------

// Calculate average book price
db.books.aggregate([
  {
    $group: {
      _id: null,
      averagePrice: { $avg: "$price" }
    }
  }
])

// Count books by availability
db.books.aggregate([
  {
    $group: {
      _id: "$available",
      totalBooks: { $sum: 1 }
    }
  }
])

// Count books by genre ID
db.books.aggregate([
  {
    $group: {
      _id: "$genreId",
      totalBooks: { $sum: 1 }
    }
  }
])

// --------------------------------------------------
// 18. DELETE operation
// --------------------------------------------------

// Delete the test book created earlier
db.books.deleteOne({
  _id: 107
})

// Verify deletion
db.books.findOne({
  _id: 107
})

// --------------------------------------------------
// 19. Final verification
// --------------------------------------------------

show collections

db.authors.find()
db.genres.find()
db.books.find()
