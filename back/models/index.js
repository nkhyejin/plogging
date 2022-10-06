const Sequelize = require("sequelize");

const env = process.env.PORT || "development";
const config = require("../config/config")[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
