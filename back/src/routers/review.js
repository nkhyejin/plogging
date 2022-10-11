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
  maria((err, conn) => {
    conn.query("SELECT * FROM REVIEW", (err, rows) => {
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

router.get("/:reviewId", function (req, res) {
  const reviewId = req.params.reviewId;

  maria((err, conn) => {
    conn.query("SELECT * FROM REVIEW WhERE reviewId = ?", [reviewId], (err, rows) => {
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

// 리뷰 작성
router.post("/create", login_required, function (req, res, next) {
  const userId = req.currentUserId;
  const { title, description, createAt } = req.body;

  maria((err, conn) => {
    conn.query(
      `INSERT INTO REVIEW(userId, title, description, createAt) VALUES(?,?,?,?)`,
      [userId, title, description, createAt],
      (err, rows) => {
        conn.release();
        if (!err) {
          res.status(200).json({
            success: true,
            title: title,
            description: description,
            createAt: createAt,
            userId: userId,
            reviewId: rows.insertId,
          });
        } else {
          console.log("err : " + err);
          res.status(400).send(err);
        }
      },
    );
  });
});

// 빈 값이 들어오면 에러가 아니라 수정만 안 하도록 바꾸기
router.put("/:reviewId", login_required, function (req, res) {
  const reviewer = req.body.userId;
  const userId = req.currentUserId;

  if (reviewer !== userId) {
    return res.sendStatus(432);
  }

  const title = req.body.title ?? null;
  const description = req.body.description ?? null;
  const reviewId = req.params.reviewId;

  maria((err, conn) => {
    conn.query(
      `UPDATE REVIEW SET title = ?, description = ? WHERE reviewId = ?`,
      [title, description, reviewId],
      (err, rows) => {
        conn.release();
        if (!err) {
          res.sendStatus(200);
        } else {
          console.log("err : " + err);
          res.status(400).send(err);
        }
      },
    );
  });
});

// router.delete("/delete", login_required, async function (req, res, next) {
//   try {
//     const user_id = req.currentUserId;

//     maria.query(` USER SET name = ? WHERE id = ?`, [name, user_id], async function (err, rows, fields) {
//       if (!err) {
//         res
//           .status(200)
//           .json({ success: true, success: true, email: email, name: rows[0].name, id: rows[0].id, token: token });
//       } else {
//         console.log("err : " + err);
//         res.send(err);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
