const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
const app = express();

var wait = [];
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
    const io = require("socket.io")(
      app.listen(PORT, () =>
        console.log(`connected to database, Server started on Port ${PORT}`)
      ),
      {
        cors: {
          origin: ["http://localhost:3000"],
        },
      }
    );
    app.set("socketio", io);
    app.set("waitlist", wait);
    io.on("connection", (socket) => {
      /* console.log("server connect: " + socket.id); */
      socket.on("waiting", (id) => {
        console.log("waiting list adding id:" + id);
        wait.push(id);
        console.log(wait);
      });
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
