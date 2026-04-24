import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add post
  const addPost = async () => {
    if (!text) return;
    try {
      await axios.post("http://localhost:5000/api/posts", { text });
      setText("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // Like post
  const likePost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/like/${id}`);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Social Media App 💙</h2>

      {/* Add Post */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={text}
          placeholder="What's on your mind?"
          onChange={(e) => setText(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
        <button onClick={addPost} style={{ marginLeft: "10px" }}>
          Post
        </button>
      </div>

      {/* Posts Feed */}
      <div>
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}
          >
            <p>{post.text}</p>

            <p>❤️ {post.likes}</p>

            <button onClick={() => likePost(post._id)}>Like</button>
            <button
              onClick={() => deletePost(post._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;