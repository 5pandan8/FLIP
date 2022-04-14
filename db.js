const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://Spandan:flip1234@cluster0.j1rj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const dbname = "FLIP";

const collection = "Book";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const state = {
  db: null,
};

const connect = (cb) => {
  if (state.db) cb();
  else {
    MongoClient.connect(uri, mongoOptions, (err, client) => {
      if (err) cb(err);
      else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, connect, collection };
