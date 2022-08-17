const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const Player = sequelize.define(
		'player',
		{
			pseudo: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: {
					name: 'UK_Player_Pseudo',
				},
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate:{
					isEmail: true
				},
				unique: {
					name: 'UK_User_Email',
				},
			},
			password: {
				type: DataTypes.CHAR(60),
				allowNull: false,
			},
			birthDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate:{
					isDate: true,
				},
			},
			gender: {
				type: DataTypes.CHAR(1),
				allowNull: false,
				defaultValue: 'o',
			},
			elo: {
				type: DataTypes.FLOAT(4),
				allowNull: false,
				defaultValue: 1200,
			},
			tournament:{
				type: DataTypes.INTEGER,
				allowNull:false,
				defaultValue:0
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			timestamps: true,
		}
	);
	return Player;
};
