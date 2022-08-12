const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const { authenticateToken } = require("../middleware/authorization");

const router = express.Router();

// Get all members
router.get("/", authenticateToken, async (req, res) => {
  try {
    const members = await pool.query("SELECT * FROM members");
    res.json({ members: members.rows });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get members with balance < 10000
router.get("/balance", authenticateToken, async (req, res) => {
  try {
    const members = await pool.query(
      "SELECT * FROM members WHERE balance<10000"
    );
    res.json({ members: members.rows });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get members with transportation TRAIN
router.get("/train", authenticateToken, async (req, res) => {
  try {
    const members = await pool.query(
      "SELECT * FROM members WHERE favoritetransportation='train'"
    );
    res.json({ members: members.rows });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get members with transportation BUS
router.get("/bus", authenticateToken, async (req, res) => {
  try {
    const members = await pool.query(
      "SELECT * FROM members WHERE favoritetransportation='bus'"
    );
    res.json({ members: members.rows });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get members with transportation PLANE
router.get("/plane", authenticateToken, async (req, res) => {
  try {
    const members = await pool.query(
      "SELECT * FROM members WHERE favoritetransportation='plane'"
    );
    res.json({ members: members.rows });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add member
router.post("/", async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "INSERT INTO members (_id, index, guid, isActive, name, balance, greeting, favoriteTransportation) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        req.body._id,
        req.body.index,
        req.body.guid,
        req.body.isActive,
        req.body.name,
        req.body.balance,
        req.body.greeting,
        req.body.favoriteTransportation,
      ]
    );
    res.send({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
