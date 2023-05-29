const express = require("express");
const shell = require("shelljs");
const path = require("path");
require("dotenv").config();
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

app.get("/", (req, res) => {
  const protocol = req.protocol;
  const host = req.get("host");

  const template = `
        <code>deploy</code><br>
        <code>------</code><br>
        <code>curl -X POST ${protocol}://${host}/</code><br>
        <code>@dalthonmh</code>`;
  res.send(template);
});

app.post("/", (req, res) => {
  try {
    const { bash = "" } = req.query;

    if (!bash) {
      res.send("Missing bashname parameter");
      return;
    }

    const PATH_FILEBASH = path.resolve(__dirname, bash);
    shell.exec(PATH_FILEBASH);
    res.send("End call " + bash);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Problemas con la petición.",
    });
  }
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
