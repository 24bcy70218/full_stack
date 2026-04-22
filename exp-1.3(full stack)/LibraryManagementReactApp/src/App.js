import React, { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" }
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = () => {
    if (!title || !author) return;
    const newBook = {
      id: Date.now(),
      title,
      author
    };
    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Library Management System</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="add-section">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button onClick={addBook}>Add Book</button>
        </div>
      </div>

      {filteredBooks.map((book) => (
        <div className="card" key={book.id}>
          <div>
            <h2>{book.title}</h2>
            <p>by {book.author}</p>
          </div>
          <button className="remove" onClick={() => removeBook(book.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
