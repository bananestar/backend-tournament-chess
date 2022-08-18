const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const Tournament = sequelize.define(
		'tournament',
		{
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			location: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			PlayersMin: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 2,
				validate: {
					min: 2,
					max: 32,
				},
			},
			PlayersMax: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 2,
				validate: {
					min: 2,
					max: 32,
				},
			},
			EloMin: {
				type: DataTypes.FLOAT(4),
				allowNull: true,
				defaultValue: 0,
				validate: {
					min: 0,
					max: 3000,
				},
			},
			EloMax: {
				type: DataTypes.FLOAT(4),
				allowNull: true,
				defaultValue: 0,
				validate: {
					min: 0,
					max: 3000,
				},
			},
			category: {
				type: DataTypes.ENUM({
					values:['junior', 'senior', 'veteran']
				}),
				allowNull: true,
			},
			statut: {
				type: DataTypes.ENUM({
					values:['WaitingForPlayers', 'InProgress', 'Closed ']
				}),
				allowNull: false,
				defaultValue: 'WaitingForPlayers',
			},
			currentRound: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			womenOnly: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			canRegister: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			registrationAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		}
	);
	return Tournament;
};
