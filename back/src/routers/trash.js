var express = require("express");
var router = express.Router();

const maria = require("../db/connect/maria");

router.get("/", function (req, res) {
  maria((err, conn) => {
    conn.query("SELECT * FROM TRASHCAN", (err, rows) => {
      conn.release();
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.status(400).send(err);
      }
    });
  });
});

router.get("/count", function (req, res) {
  maria((err, conn) => {
    conn.query("SELECT * FROM TRASHCOUNT", (err, rows) => {
      conn.release();
      if (!err) {
        res.send(rows);
      } else {
        console.log("err : " + err);
        res.status(400).send(err);
      }
    });
  });
});

module.exports = router;
