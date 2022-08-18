const { Sequelize } = require('sequelize');
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_SERVER, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
	host: DB_SERVER,
	port: DB_PORT,
	dialect: 'mysql',
});
const db = {};

db.sequelize = sequelize;

db.User = require('./user')(sequelize);
db.Tournament = require('./tournament')(sequelize);
db.Match = require('./match')(sequelize);

db.Tournament.belongsToMany(db.User, { through: 'UserTournament' })
db.User.belongsToMany(db.Tournament, { through: 'UserTournament' })

db.Tournament.hasMany(db.Match, {
	foreignKey: 'tournamentId',
	allowNull: false,
});

db.User.hasMany(db.Match, {
	foreignKey: 'playerWhiteId',
	allowNull: false,
});

db.User.hasMany(db.Match, {
	foreignKey: 'playerBlackId',
	allowNull: false,
});

module.exports = db;
