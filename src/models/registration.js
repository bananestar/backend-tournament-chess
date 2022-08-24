const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const Registration = sequelize.define('registration',{},{timestamps:true});

	return Registration;
};
