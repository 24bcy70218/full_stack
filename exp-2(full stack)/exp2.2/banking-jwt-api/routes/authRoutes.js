const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// Protected Route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Banking Dashboard" });
});

module.exports = router;
