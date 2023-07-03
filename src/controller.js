let db = require("./db");

let listEntries = function (req, res) {
  //returns a summary of all movie entries in the database

  let sql = "select id, movie_name, finished from movies";

  db.query(sql, function (err, results) {
    if (err) {
      console.log("fail to query database", err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
};

let getEntry = function (req, res) {
  //1. want to get id from req params
  //2. we want to exec the sql statement to get the info for an entry from db, but only for that id

  let id = req.params.id;

  let sql = "select * from movies where id = ?";
  let params = [id];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("fail to query database", err);
      res.sendStatus(500);
    } else {
      if (results.length == 0) {
        res.sendStatus(404);
      } else {
        res.json(results[0]);
      }
    }
  });
};

let deleteEntry = function (req, res) {
  // want to accept a id from the req
  // we will delete a row with matching id

  let id = req.params.id;

  let sql = "delete from movies where id = ?";
  let params = [id];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("delete query failed", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

let addEntry = function (req, res) {
  // read some data from request
  // execute the query that will insert data into the database

  let movieName = req.body.movie_name;
  let movieYear = req.body.movie_year;
  let genre = req.body.genre;

  let sql =
    "insert into movies (movie_name, movie_year, genre) values (?, ?, ?);";
  let params = [movieName, movieYear, genre];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed to insert into database", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

let updateEntry = function (req, res) {
  // get the id from the req path param (like del, get)
  // we will get the rest of the info from the req body (like the post)

  let id = req.params.id;
  let movieName = req.body.movie_name;
  let movieYear = req.body.movie_year;
  let genre = req.body.genre;
  let finished = req.body.finished;

  if (!title) {
    res.status(400).json("Title is required");
    return;
  }
  let finished2 = false;
  if (finished == true) {
    finished2 = true;
  }

  let sql =
    "update movies set movie_name = ?, movie_year = ?, genre = ?, finished = ? where id = ?";
  let params = [movieName, movieYear, genre, finished2, id];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed to update database", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

module.exports = {
  listEntries,
  getEntry,
  deleteEntry,
  addEntry,
  updateEntry,
};
