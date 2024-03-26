const express = require("express");
const router = express.Router();
const { submitFlag } = require("../controllers/Flag");
// import { submitQuest } from "../controllers/Quest";
const { submitQuest } = require("../controllers/Quest");
router.post("/flag", submitFlag);
router.post("/question", submitQuest);

module.exports = router;
