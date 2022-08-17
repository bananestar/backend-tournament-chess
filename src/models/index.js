const { Sequelize } = require("sequelize");
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_SERVER, DB_PORT } =
  process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_SERVER,
  port: DB_PORT,
  dialect: "mysql",
});
const db = {};

db.sequelize = sequelize;

db.Player = require('./player')(sequelize)
db.Tournament = require('./tournament')(sequelize)

module.exports = db;