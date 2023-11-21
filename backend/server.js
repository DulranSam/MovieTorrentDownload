const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const ganidu = require("./routes/ganidu");
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const mongoose = require("mongoose");
const fs = require("fs");

app.use(express.json());
app.use(cors());
app.use("/home", ganidu);
if (!fs.existsSync(path.join(__dirname, "public"))) {
  fs.mkdirSync(path.join(__dirname, "public"));
}
app.use(express.static(path.join(__dirname, "public")));
app.use("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Alert: "404 frfr where tf u going bruh L bozo" });
  } else {
    res.type("txt").send("404 u dumbass bwai");
  }
});

async function start() {
  await mongoose.connect(
    cluster,
    { useNewUrlParser: true },
    console.log(`Connected to ${cluster}`)
  );

  try {
    app.listen(port, console.log(`Hi i'm listening on port ${port}`)); //http://localhost:8000/
  } catch (err) {
    console.error(err);
  }
}

start();
