const express = require("express");
const router = express.Router();
const { submitFlag } = require("../controllers/Flag");

router.post("/flag", submitFlag);

module.exports = router;
