const express = require("express");
const shell = require("shelljs");
const path = require("path");
require("dotenv").config();
const BASH_FILE = process.env.BASH_FILE;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.post("/deploy", (req, res) => {
  const PATH_FILEBASH = path.resolve(__dirname, BASH_FILE);
  shell.exec(PATH_FILEBASH);
  res.send("End call " + BASH_FILE);
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
