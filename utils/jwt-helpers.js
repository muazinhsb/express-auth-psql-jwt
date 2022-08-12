const jwt = require("jsonwebtoken");

function jwtTokens({ _id, name, email, password }) {
  const admin = { _id, name, email, password };
  const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "120s",
  });
  const refreshToken = jwt.sign(admin, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  return { accessToken, refreshToken };
}

module.exports = { jwtTokens };
