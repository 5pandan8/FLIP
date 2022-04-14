const express = require("express");
const db = require("../../db");
const spawn = require("child_process").spawn;
const request = require("request");
const cheerio = require("cheerio");

router = express.Router();

router.get("/book", (req, res) => {
  const bookname = req.query.bookName;
  const author = req.query.author;
  const collectionName = req.query.collectionName;

  if (!bookname || !collectionName || !author)
    return res.status(400).json({ msg: "Enter BookName and collection" });
  else {
    db.getDB()
      .collection(collectionName)
      .find({ BookName: bookname, Author: author })
      .toArray((err, document) => {
        if (err) console.log(err);
        else {
          console.log(document);
          res.json(document);
        }
      });
  }
});

router.get("/prembook", (req, res) => {
  const bookname = req.query.bookName;
  const collectionName = req.query.collectionName;

  if (!bookname || !collectionName)
    return res.status(400).json({ msg: "Enter BookName and collection" });
  else {
    db.getDB()
      .collection(collectionName)
      .find({ BookName: bookname })
      .toArray((err, document) => {
        if (err) console.log(err);
        else {
          console.log(document);
          res.json(document);
        }
      });
  }
});

router.put("/updateSummary", (req, res) => {
  const bookName = req.body.bookName;
  const author = req.body.author;
  const pageNo = req.body.pageNo;
  const newSummary = req.body.newSummary;
  const collectionName = req.body.collectionName;

  if (!pageNo || !newSummary || !bookName || !collectionName || !author) {
    return res
      .status(400)
      .json({ msg: "Please enter Book Name, Id and content" });
  }

  const query = {
    BookName: bookName,
    Author: author,
  };

  const upIndex = `pages.${pageNo - 1}.summary`;
  var setQuery = {};
  setQuery[upIndex] = newSummary;

  const updateField = {
    $set: setQuery,
  };

  db.getDB()
    .collection(collectionName)
    .findOneAndUpdate(
      query,
      updateField,
      { returnOriginal: false, upsert: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            msg: "Error occured while inserting Data",
            error: err,
          });
        } else {
          res.status(200).json({
            msg: `Summary updated in collection ${collectionName} and Book ${bookName} and Page ${pageNo}`,
          });
        }
      }
    );
});

router.put("/updateOneW", (req, res) => {
  const bookName = req.body.bookName;
  const author = req.body.author;
  const pageNo = req.body.pageNo;
  const newQuestion = req.body.newQuestion;
  const newAnswer = req.body.newAnswer;
  const quesNo = req.body.quesNo;
  const collectionName = req.body.collectionName;

  if (
    !pageNo ||
    !newQuestion ||
    !newAnswer ||
    !bookName ||
    !collectionName ||
    !author
  ) {
    return res
      .status(400)
      .json({ msg: "Please enter Book Name, Id and content" });
  }

  const query = {
    BookName: bookName,
    Author: author,
  };

  const upQuestion = `pages.${pageNo - 1}.oneW.${quesNo - 1}.question`;
  const upAnswer = `pages.${pageNo - 1}.oneW.${quesNo - 1}.answer`;
  var setQuery = {};
  setQuery[upQuestion] = newQuestion;
  setQuery[upAnswer] = newAnswer;

  const updateField = {
    $set: setQuery,
  };

  db.getDB()
    .collection(collectionName)
    .findOneAndUpdate(
      query,
      updateField,
      { returnOriginal: false, upsert: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            msg: "Error occured while inserting Data",
            error: err,
          });
        } else {
          res.status(200).json({
            msg: `OneW updated in collection ${collectionName} and Book ${bookName} and Page ${pageNo}`,
          });
        }
      }
    );
});

router.put("/updateFIB", (req, res) => {
  const bookName = req.body.bookName;
  const pageNo = req.body.pageNo;
  const author = req.body.author;
  const newQuestion = req.body.newQuestion;
  const newAnswer = req.body.newAnswer;
  const quesNo = req.body.quesNo;
  const collectionName = req.body.collectionName;

  if (
    !pageNo ||
    !newQuestion ||
    !newAnswer ||
    !bookName ||
    !collectionName ||
    !author
  ) {
    return res
      .status(400)
      .json({ msg: "Please enter Book Name, Id and content" });
  }

  const query = {
    BookName: bookName,
    Author: author,
  };

  const upQuestion = `pages.${pageNo - 1}.fib.${quesNo - 1}.question`;
  const upAnswer = `pages.${pageNo - 1}.fib.${quesNo - 1}.answer`;
  var setQuery = {};
  setQuery[upQuestion] = newQuestion;
  setQuery[upAnswer] = newAnswer;

  const updateField = {
    $set: setQuery,
  };

  db.getDB()
    .collection(collectionName)
    .findOneAndUpdate(
      query,
      updateField,
      { returnOriginal: false, upsert: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            msg: "Error occured while inserting Data",
            error: err,
          });
        } else {
          res.status(200).json({
            msg: `FIB updated in collection ${collectionName} and Book ${bookName} and Page ${pageNo}`,
          });
        }
      }
    );
});

router.put("/updateMCQ", (req, res) => {
  const bookName = req.body.bookName;
  const pageNo = req.body.pageNo;
  const author = req.body.author;
  const newQuestion = req.body.newQuestion;
  const newAnswer = req.body.newAnswer;
  const newOptions = req.body.newOptions;
  const quesNo = req.body.quesNo;
  const collectionName = req.body.collectionName;

  if (
    !pageNo ||
    !newQuestion ||
    !newAnswer ||
    !bookName ||
    !collectionName ||
    !newOptions
  ) {
    return res
      .status(400)
      .json({ msg: "Please enter Book Name, Id and content" });
  }

  const query = {
    BookName: bookName,
    Author: author,
  };

  const upQuestion = `pages.${pageNo - 1}.mcq.${quesNo - 1}.question`;
  const upAnswer = `pages.${pageNo - 1}.mcq.${quesNo - 1}.answer`;
  const upOptions = `pages.${pageNo - 1}.mcq.${quesNo - 1}.options`;
  var setQuery = {};
  setQuery[upQuestion] = newQuestion;
  setQuery[upAnswer] = newAnswer;
  setQuery[upOptions] = newOptions;

  const updateField = {
    $set: setQuery,
  };

  db.getDB()
    .collection(collectionName)
    .findOneAndUpdate(
      query,
      updateField,
      { returnOriginal: false, upsert: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            msg: "Error occured while inserting Data",
            error: err,
          });
        } else {
          res.status(200).json({
            msg: `MCQ updated in collection ${collectionName} and Book ${bookName} and Page ${pageNo}`,
          });
        }
      }
    );
});

router.get("/checkAuthor", (req, res) => {
  const user_UID = req.query.user_UID;

  if (!user_UID) {
    return res.status(400).json({ msg: "Please enter Id" });
  }

  const query = {
    user_UID: user_UID,
  };

  db.getDB()
    .collection("Author")
    .find(query)
    .toArray((err, document) => {
      if (err) console.log(err);
      else {
        var val = null;
        if (document[0]) {
          val = true;
        } else {
          val = false;
        }
        res.json({
          check: val,
        });
      }
    });
});

module.exports = router;
