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
db.Registration = require('./registration')(sequelize)

db.Tournament.hasMany(db.Registration,{
	foreignKey: 'tournamentId',
	onDelete: 'CASCADE',
	allowNull: false,
})
db.User.hasMany(db.Registration,{
	foreignKey: 'userId',
	onDelete: 'CASCADE',
	allowNull: false,
})

db.Tournament.hasMany(db.Match, {
	foreignKey: 'tournamentId',
	onDelete: 'CASCADE',
	allowNull: false,
});

db.User.hasMany(db.Match, {
	foreignKey: 'playerWhiteId',
	onDelete: 'CASCADE',
	allowNull: false,
});

db.User.hasMany(db.Match, {
	foreignKey: 'playerBlackId',
	onDelete: 'CASCADE',
	allowNull: false,
});

module.exports = db;
