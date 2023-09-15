const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  // Retrieve username and password from the request body
  const { username, password } = req.body;

  if (!username || !password) {
    // Check if username or password is missing
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username already exists
  if (users.find((user) => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Register the new user by adding them to the 'users' array
  users.push({ username, password });

  // Respond with a success message
  return res.status(201).json({ message: "User registered successfully" });

  // return res.status(300).json({message: "Yet to be implemented"});
});

// // Get the book list available in the shop
// public_users.get('/', function (req, res) {
//   //Write your code here
//   res.status(200).json(books);
//   // return res.status(300).json({message: "Yet to be implemented"});
// });

// TASK 10 - Get the book list available in the shop using Promises
public_users.get('/books',function (req, res) {

  const get_books = new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify({books}, null, 4)));
    });

    get_books.then(() => console.log("Task 10 using promises successful"));

});

// // Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn; // retrieve the ISBN from request parameters

//   // Search for the book in the books array
//   const book = Object.values(books).find((b) => b.isbn === isbn)

//   if (book) {
//     res.status(200).json(book); //if the book is found,s send its details

//   } else {
//     // If the book is not found, send a 404 Not Found response
//     res.status(404).json({ message: "Book not found!" })
//   }
//   // return res.status(300).json({message: "Yet to be implemented"});
// });
//Task 11 - Get the book details from isbn using promises
public_users.get('/isbn/:isbn',function (req, res) {
  const get_books_isbn = new Promise((resolve, reject) => {
  const isbn = req.params.isbn;
  // console.log(isbn);
      if (req.params.isbn <= 10) {
      resolve(res.send(books[isbn]));
  }
      else {
          reject(res.send('ISBN does not exist'));
      }
  });
  get_books_isbn.
      then(function(){
          console.log("Task 11 promise resolved");
 }).
      catch(function () { 
              console.log('ISBN does not exist');
});

});




// // Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//   //Write your code here
//   const author = req.params.author;

//   const authorBooks = Object.values(books).filter((book) => book.author === author)
//   if (authorBooks.length > 0) {
//     res.status(200).json(authorBooks);
//   } else {
//     res.status(200).json({ message: "No books found by the author" });
//   }
//   // return res.status(300).json({message: "Yet to be implemented"});
// });

// TASK 12 - Get book details based on author
public_users.get('/books/author/:author',function (req, res) {

  const get_books_author = new Promise((resolve, reject) => {

  let booksbyauthor = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["author"] === req.params.author) {
      booksbyauthor.push({"isbn":isbn,
                          "title":books[isbn]["title"],
                          "reviews":books[isbn]["reviews"]});
    resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
    }


  });
  reject(res.send("Author does not exist "))
      
  });

  get_books_author.then(function(){
          console.log("Promise is met");
 }).catch(function () { 
              console.log('Author does not exist');
});

});



// // Get all books based on title
// public_users.get('/title/:title', function (req, res) {
//   //Write your code here
//   const title = req.params.title;
//   const titleBooks = Object.values(books).filter((b) => b.title === title);
//   if (titleBooks.length > 0) {
//     res.status(200).json(titleBooks);
//   } else {
//     res.status(200).json({ message: "No books found by title" });

//   }
//   // return res.status(300).json({message: "Yet to be implemented"});
// });
//Task 13 get book title using promises
public_users.get('/title/:title',function (req, res) {

  const get_book_title = new Promise((resolve, reject) => {

  let book_title = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["title"] === req.params.title) {
      book_title.push({"isbn":isbn,
                          "author":books[isbn]["author"],
                          "reviews":books[isbn]["reviews"]});
    resolve(res.send(JSON.stringify({book_title}, null, 4)));
    }
  });
  reject(res.send("Title does not exist "))        
  });
  get_book_title.then(function(){
          console.log("Promise is resolved");
 }).catch(function () { 
              console.log('Title does not exist');
});
});



//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; //Retrieve the ISBN from request parameters
  // find the book by ISBN 
  const book = books[isbn];
  if (book && book.review) {
    res.status(200).json(book.review);
  } else {
    res.status(200).json({ message: "Book or review not found" });
  }


  // return res.status(300).json({message: "Yet to be implemented"});
});



module.exports.general = public_users;
