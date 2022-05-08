require("dotenv").config();

const purifyPath = require("../handler/purifyPath");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const ROOT_PATH = __dirname.replace("routes", "");

router.get("*", function (req, res) {
  res.setHeader("Content-type", "text/css");
  const _path =
    `${ROOT_PATH}/public/css/` +
    purifyPath(`${req.headers.host}${req.originalUrl}`.split("/css")[1]);
  if (_path.length > 0 && _path) {
    if (fs.existsSync(_path)) {
      res.sendFile(`${_path}`);
    } else {
      res.json({
        Success: false,
        Message: "Content not found",
        ErrorCode: 404,
      });
    }
  } else {
    res.json({
      Success: false,
      Message: "Bad request",
      ErrorCode: 400,
    });
  }
});

module.exports = router;
