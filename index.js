const express = require("express");
const shell = require("shelljs");
const path = require("path");
require("dotenv").config();
const BASH_FILE = process.env.BASH_FILE;
const PORT = process.env.PORT;
const TITLE = process.env.TITLE;

// https://stackoverflow.com/a/30360821/9868383
function setTerminalTitle(title) {
  process.stdout.write(
    String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
  );
}

setTerminalTitle(TITLE);

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
