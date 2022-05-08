require("dotenv").config();
var purifyPath = require("../handler/purifyPath");
var express = require("express");
var router = express.Router();
var fs = require("fs");
var ROOT_PATH = __dirname.replace("routes", "");
router.get("*", function (req, res) {
    res.setHeader("Content-type", "text/css");
    var _path = "".concat(ROOT_PATH, "/public/css/") +
        purifyPath("".concat(req.headers.host).concat(req.originalUrl).split("/css")[1]);
    if (_path.length > 0 && _path) {
        if (fs.existsSync(_path)) {
            res.sendFile("".concat(_path));
        }
        else {
            res.json({
                Success: false,
                Message: "Content not found",
                ErrorCode: 404
            });
        }
    }
    else {
        res.json({
            Success: false,
            Message: "Bad request",
            ErrorCode: 400
        });
    }
});
module.exports = router;
