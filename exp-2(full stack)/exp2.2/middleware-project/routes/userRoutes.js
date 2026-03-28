const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

// Login
router.post("/login", (req, res) => {
    const user = { id: 1, name: "Naveen" };
    const token = jwt.sign(user, "secretkey");

    res.json({ token });
});

// Protected route
router.get("/dashboard", auth, (req, res) => {
    res.json({
        message: "Welcome Dashboard",
        user: req.user,
    });
});

module.exports = router;
