const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
// const { authenticateToken } = require("../middleware/authorization");

const router = express.Router();

// Get all admin
router.get("/", async (req, res) => {
  try {
    const admin = await pool.query("SELECT * FROM admin");
    res.json({ admin: admin.rows });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Register Admin
router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "INSERT INTO admin (name, email, password) VALUES($1, $2, $3) RETURNING *",
      [req.body.name, req.body.email, hashedPassword]
    );
    res.send({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
