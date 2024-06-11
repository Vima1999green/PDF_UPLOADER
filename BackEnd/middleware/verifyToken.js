const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid token.");
  }
};

module.exports = verifyToken;
