const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    const verify = jwt.verify(token, process.env.SECRET);

    req.player = { id: verify.id, userName: verify.userName };

    next();
  } catch (error) {
    res.status(200).json({ message: "Unauthenticated User" });
  }
};
module.exports = authenticate;
