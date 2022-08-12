const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../utils/jwt-helpers");

const router = express.Router();

// Login Admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate email
    const admin = await pool.query("SELECT * FROM admin WHERE email=$1", [
      email,
    ]);
    if (admin.rows.length === 0)
      return res.status(401).send({ error: "Incorrect Email" });
    // Validate password
    const validPassword = await bcrypt.compare(
      password,
      admin.rows[0].password
    );
    if (!validPassword)
      return res.status(401).send({ error: "Incorrect Password" });
    // JWT
    let tokens = jwtTokens(admin.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

module.exports = router;
