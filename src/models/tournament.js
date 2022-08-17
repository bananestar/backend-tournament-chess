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
			place: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			minPlayers: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 2,
				validate: {
					min: 2,
					max: 32,
				},
			},
			maxPlayers: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 2,
				validate: {
					min: 2,
					max: 32,
				},
			},
			minElos: {
				type: DataTypes.FLOAT(4),
				allowNull: true,
				defaultValue: 0,
				validate: {
					min: 0,
					max: 3000,
				},
			},
			maxElos: {
				type: DataTypes.FLOAT(4),
				allowNull: true,
				defaultValue: 0,
				validate: {
					min: 0,
					max: 3000,
				},
			},
			category: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					isIn: [['junior', 'senior', 'veteran']],
				},
			},
			statut: {
				type: DataTypes.STRING(100),
				allowNull: false,
				defaultValue: 'en attente de joueurs',
				validate: {
					isIn: [['en attente de joueurs', 'en cours', 'terminé']],
				},
			},
			round: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			womenOnly: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			registrationDate: {
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
