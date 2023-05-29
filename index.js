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
  try {
    const protocol = req.protocol;
    const host = req.get("host");
    const { bash = "" } = req.query;

    if (!bash) {
      const template = `
        <code>deploy</code><br>
        <code>------</code><br>
        <code>curl ${protocol}://${host}/?bash=bashname.sh</code><br>
        <code>@dalthonmh</code>`;
      res.send(template);

      return;
    }

    const PATH_FILEBASH = path.resolve(__dirname, bash);
    shell.exec(PATH_FILEBASH);
    res.send(
      `Fin de ejecución de: ${bash} <br><a href='${protocol}://${host}'>Regresar</a>`
    );
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
