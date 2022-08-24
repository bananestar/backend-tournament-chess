const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const User = sequelize.define(
		'user',
		{
			pseudo: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: {
					name: 'UK_User_Pseudo',
				},
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isEmail: true,
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
				validate: {
					isDate: true,
				},
			},
			gender: {
				type: DataTypes.ENUM({
					values: ['FEMALE', 'MALE', 'OTHER'],
				}),
				allowNull: false,
				defaultValue: 'OTHER',
			},
			elo: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1200,
			},
			matchWin:{
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			matchLoose:{
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			matchDraw:{
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
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
	return User;
};
