const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login_required = require("../middlewares/login_required");

const maria = require("../db/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "User" });
});

// 유저 정보 전체 확인
router.get("/select", function (req, res) {
  maria((err, conn) => {
    conn.query("SELECT * FROM USER", [], (err, rows) => {
      conn.release();
      if (err) {
        throw err;
      }

      return res.json({ data: rows });
    });
  });
});

// 편의를 위한 초기화(롤백안됨)
router.get("/init", function (req, res) {
  maria.query("TRUNCATE TABLE USER;", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log("err : " + err);
      res.send(err);
    }
  });
});

// 회원가입
router.post("/register", async function (req, res, next) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  maria((err, conn) => {
    conn.query(
      `INSERT INTO USER(name, email, hashedPassword) VALUES(?,?,?)`,
      [name, email, hashedPassword],
      (err, rows) => {
        conn.release();
        if (err) {
          console.log("err : " + err);
          return res.send(err);
        }

        return res.status(200).json({ success: true, message: "user register success" });
      },
    );
  });
});

// 로그인
router.post("/login", function (req, res, next) {
  const { email, password } = req.body;

  maria((err, conn) => {
    conn.query("SELECT * FROM USER WHERE email = ?", [email], async (err, rows) => {
      conn.release();
      if (!err & rows.length) {
        const correctPasswordHash = rows[0].hashedPassword;
        const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

        if (!isPasswordCorrect) {
          return res.status(401);
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id: rows[0].id }, secretKey);

        res.status(200).json({ success: true, email: email, id: rows[0].id, token: token, name: rows[0].name });
      } else if (!err && !rows.length) {
        res.status(401);
      } else {
        res.status(400).send(err);
      }
    });
  });
});

router.delete("/delete", login_required, function (req, res, next) {
  const user_id = req.currentUserId;

  maria((err, conn) => {
    conn.query("DELETE FROM USER WHERE id = ?", [user_id], (err, rows) => {
      conn.release();
      if (err) {
        return res.send(400).send(err);
      }

      return res.status(200);
    });
  });
});

router.put("/modify", login_required, function (req, res, next) {
  const { name } = req.body;
  const user_id = req.currentUserId;

  maria((err, conn) => {
    conn.query(`UPDATE USER SET name = ? WHERE id = ?`, [name, user_id], (err, rows) => {
      conn.release();
      if (!err) {
        res.status(200);
      } else {
        console.log("err : " + err);
        res.status(400).send(err);
      }
    });
  });
});

// modify 전, 비밀번호 체크
// router.post("/verify", login_required, async function (req, res, next) {
//   try {
//     const user_id = req.currentUserId;
//     const { password } = req.body;

//     maria.query(`SELECT hashedPassword FROM USER WHERE id = ?`, [user_id], async function (err, rows, fields) {
//       if (!err) {
//         const correctPasswordHash = rows[0].hashedPassword;
//         const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
//         if (!isPasswordCorrect) {
//           return res.json({ success: false });
//         }
//         res.json({ success: true });
//       } else {
//         console.log("err : " + err);
//         res.send(err);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/mypage", login_required, function (req, res) {
  const userId = req.currentUserId;
  maria((err, conn) => {
    conn.query(
      `SELECT * FROM USER INNER JOIN REVIEW ON USER.id = REVIEW.userId where id = ?`,
      [userId],
      (err, rows) => {
        conn.release();
        if (!err) {
          res.send(rows);
        } else {
          console.log("err : " + err);
          res.status(400).send(err);
        }
      },
    );
  });
});

module.exports = router;
