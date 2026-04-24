import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async () => {
    await axios.post("http://localhost:5000/api/posts", { title });
    setTitle("");
    fetchPosts();
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    fetchPosts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Blog App 💙</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title..."
      />
      <button onClick={addPost}>Add</button>

      {posts.map((p) => (
        <div key={p._id}>
          {p.title}
          <button onClick={() => deletePost(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;