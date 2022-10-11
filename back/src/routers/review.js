const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login_required = require("../middlewares/login_required");

const maria = require("../db/connect/maria");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Review" });
// });

router.get("/", function (req, res) {
  maria.query("SELECT * FROM REVIEW", function (err, rows, fields) {
    if (!err) {
      res.send(rows);
      console.log(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

router.get("/:reviewId", function (req, res) {
  const reviewId = req.params.reviewId;
  maria.query("SELECT * FROM REVIEW WhERE reviewId = ?", [reviewId], function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

// 리뷰 작성
router.post("/create", login_required, async function (req, res, next) {
  const userId = req.currentUserId;
  try {
    const { title, description, createAt, name } = req.body;

    maria.query(
      `INSERT INTO REVIEW(userId, title, description, createAt, userName) VALUES(?,?,?,?,?)`,
      [userId, title, description, createAt, name],
      function (err, rows, fields) {
        if (!err) {
          res.status(200).json({
            success: true,
            title: title,
            description: description,
            createAt: createAt,
            userId: userId,
            name: name,
            reviewId: rows.insertId,
          });
        } else {
          console.log("err : " + err);
          res.send(err);
        }
      },
    );
  } catch (error) {
    next(error);
  }
});

// 빈 값이 들어오면 에러가 아니라 수정만 안 하도록 바꾸기
router.put("/:reviewId", login_required, async function (req, res, next) {
  try {
    const reviewer = req.body.userId;
    const userId = req.currentUserId;
    if (reviewer !== userId) {
      return res.sendStatus(432);
    }
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const reviewId = req.params.reviewId;
    maria.query(
      `UPDATE REVIEW SET title = ?, description = ? WHERE reviewId = ?`,
      [title, description, reviewId],
      async function (err, rows, fields) {
        if (!err) {
          res.status(200).json({
            success: true,
          });
        } else {
          console.log("err : " + err);
          res.send(err);
        }
      },
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/:reviewId", login_required, async function (req, res, next) {
  try {
    const reviewer = req.body.userId;
    const userId = req.currentUserId;
    const reviewId = req.params.reviewId;

    if (reviewer !== userId) {
      return res.sendStatus(432);
    }

    maria.query(`DELETE FROM REVIEW WHERE reviewId = ?`, [reviewId], async function (err, rows, fields) {
      if (!err) {
        res.status(200).json({ success: true });
      } else {
        console.log("err : " + err);
        res.send(err);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
