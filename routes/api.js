require("dotenv").config();
var express = require("express");
var router = express.Router();
router.get("/", function (req, res) {
    res.json({ Success: true, Message: "Okay" });
});
module.exports = router;
