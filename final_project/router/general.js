const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.status(200).json(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; // retrieve the ISBN from request parameters

  // Search for the book in the books array
  const book = Object.values(books).find((b) => b.isbn === isbn)

  if(book){
    res.status(200).json(book); //if the book is found,s send its details

  }else{
    // If the book is not found, send a 404 Not Found response
    res.status(404).json({message:"Book not found!"})
  }
  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  const authorBooks = Object.values(books).filter((book) => book.author === author)
    if(authorBooks.length >0){
    res.status(200).json(authorBooks);
  }else{
    res.status(200).json({message:"No books found by the author"});
  }
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const titleBooks = Object.values(books).filter((b)=> b.title === title);
  if(titleBooks.length > 0){
    res.status(200).json(titleBooks);
  }else{
    res.status(200).json({message:"No books found by title"});

  }
  // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; //Retrieve the ISBN from request parameters
    // find the book by ISBN 
    const book = books[isbn];
    if(book && book.review){
      res.status(200).json(book.review);
    }else{
      res.status(200).json({message:"Book or review not found"});
    }
  
  
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
