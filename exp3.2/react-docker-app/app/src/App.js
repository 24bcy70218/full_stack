import React from "react";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 Dockerized React App</h1>
      <p>Now running successfully with Nginx!</p>

      <button onClick={() => alert("It works! 🎉")}>
        Click Me
      </button>
    </div>
  );
}

export default App;