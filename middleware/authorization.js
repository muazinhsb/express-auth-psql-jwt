const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Bearer Token
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(401).send({ error: "Null token" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, member) => {
    if (error) return res.status(403).send({ error: error.message });
    req.member = member;
    next();
  });
}

module.exports = { authenticateToken };
