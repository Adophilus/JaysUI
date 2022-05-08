require("dotenv").config();

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.json({ Success: true, Message: "Okay" });
});

module.exports = router;
