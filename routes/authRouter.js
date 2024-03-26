const express = require("express");
const router = express.Router();
const { setUserName, login } = require("../controllers/auth");

router.post("/setUsername", setUserName);
router.post("/login", login);

module.exports = router;
//
