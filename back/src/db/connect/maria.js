const mysql = require("mysql");
const logger = require("./logger");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MariaDB_host,
  port: process.env.MariaDB_port,
  user: process.env.MariaDB_user,
  password: process.env.MariaDB_password,
  database: process.env.MariaDB_database,
  connectionLimit: 50,
});

logger.info("Connection pool created.");

pool.on("acquire", function (connection) {
  logger.info(`Connection ${connection.threadId} acquired`);
});

pool.on("enqueue", function () {
  logger.info("Waiting for available connection slot");
});

pool.on("release", function (connection) {
  logger.info(`Connection ${connection.threadId} released`);
});

const getConn = function (callback) {
  pool.getConnection(function (err, connection) {
    callback(err, connection);
  });
};

module.exports = getConn;

// const connect = maria.createConnection({
//   host: process.env.MariaDB_host,
//   port: process.env.MariaDB_port,
//   user: process.env.MariaDB_user,
//   password: process.env.MariaDB_password,
//   database: process.env.MariaDB_database,
// });

// module.exports = connect;
