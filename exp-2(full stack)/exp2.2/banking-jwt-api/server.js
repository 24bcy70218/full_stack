const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Root route (for browser check)
app.get("/", (req, res) => {
  res.send("Banking API is running 💖");
});

// ✅ API Routes
app.use("/api", require("./routes/authRoutes"));

// ✅ Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});