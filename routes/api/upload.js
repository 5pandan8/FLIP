const express = require("express");
const upload = require("express-fileupload");
const spawn = require("child_process").spawn;
const path = require("path");
const db = require("../../db");
const fs = require("fs");

router = express.Router();

router.use(upload());

router.post("/", (req, res) => {
  const file = req.files.file;
  const user = req.body.user;
  const filenametemp = file.name;
  const filenametemp2 = filenametemp.split(" ").join("_");
  const filename = [
    filenametemp2.slice(0, -4),
    `_${user}`,
    filenametemp2.slice(-4),
  ].join("");

  if (file == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  flip_dir = path.join(path.dirname(path.dirname(__dirname)));
  file.mv(`${flip_dir}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      res
        .status(400)
        .json({ msg: "Error occured while uploading file", error: err });
    } else {
      file_path = path.join(flip_dir, "client", "public", "uploads", filename);
      fs.rename(
        `${flip_dir}/client/public/uploads/${file.name}`,
        file_path,
        (err) => {
          if (err) console.log(err);
        }
      );
      file_name_noExt = path.basename(filename.toLowerCase(), ".pdf");

      newBook = {
        BookName: file_name_noExt,
        pages: [],
      };

      db.getDB()
        .collection(db.collection)
        .insertOne(newBook, (err, result) => {
          if (err) {
            console.log(err);
          }
        });

      const process = spawn("python", [
        "./pymain.py",
        file_path,
        file_name_noExt,
        db.collection,
      ]);
      process.stdout.on("data", (data) => {
        console.log(data.toString());
        const io = req.app.get("socketio");
        var waitList = req.app.get("waitlist");
        const socketID = waitList.shift();
        io.to(socketID).emit("waiting-reponse", true);
        console.log("response sent");
      });
      res
        .status(200)
        .json({ fileName: file_name_noExt, filePath: `/uploads/${filename}` });
    }
  });
});

router.post("/author", (req, res) => {
  const file = req.files.file;
  const author = req.body.author;
  const filename = file.name;

  if (file == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  flip_dir = path.join(path.dirname(path.dirname(__dirname)));
  file.mv(`${flip_dir}/client/public/uploads/author/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      res
        .status(400)
        .json({ msg: "Error occured while uploading file", error: err });
    } else {
      file_path = path.join(
        flip_dir,
        "client",
        "public",
        "uploads",
        "author",
        filename
      );
      file_name_noExt = path.basename(filename.toLowerCase(), ".pdf");

      newBook = {
        BookName: file_name_noExt,
        Author: author,
        pages: [],
      };

      db.getDB()
        .collection("PremBook")
        .insertOne(newBook, (err, result) => {
          if (err) {
            console.log(err);
          }
        });

      const process = spawn("python", [
        "./pymain.py",
        file_path,
        file_name_noExt,
        "PremBook",
      ]);
      process.stdout.on("data", (data) => {
        console.log(data.toString());
      });
      res
        .status(200)
        .json({ fileName: file_name_noExt, filePath: `/uploads/${filename}` });
    }
  });
});

module.exports = router;
