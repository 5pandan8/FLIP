const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/flip", require("./routes/api/flip"));

app.use("/api/upload", require("./routes/api/upload"));

app.use("/api/authorUpdate", require("./routes/api/authorUpdate"));

const PORT = 5000;

db.connect((err) => {
  if (err) {
    console.log(err);
    console.log("unable to connect to database");
    process.exit(1);
  } else {
    app.listen(PORT, () =>
      console.log(`connected to database, Server started on Port ${PORT}`)
    );
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
