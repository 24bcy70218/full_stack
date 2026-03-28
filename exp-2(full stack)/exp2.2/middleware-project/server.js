const express = require("express");
const logger = require("./middleware/logger");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Body parser middleware
app.use(express.json());

// Logger middleware
app.use(logger);

// ✅ Home route (fix for "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Server is working ❤️");
});

// Routes
app.use("/api", userRoutes);

// Test error route
app.get("/error", (req, res) => {
    throw new Error("Test error");
});

// Error handling middleware (MUST BE LAST)
app.use(errorHandler);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});