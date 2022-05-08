require("dotenv").config();

const Console = require("../handler/console");
const view = require("../handler/view");
const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));

app.use("/js", require("../routes/js"));
app.use("/api", require("../routes/api"));
app.use("/css", require("../routes/css"));
app.use("/components", require("../routes/components"));

app.get("/", function (req, res) {
  res.sendFile(view(`index`));
});

app.listen(process.env.PORT || 3002, function (err) {
  err != null
    ? Console.err(err)
    : Console.success(
        `Application is Running on Port http://localhost:${
          process.env.PORT || 3002
        }`
      );
});
