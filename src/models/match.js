const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const Match = sequelize.define('match', {
		result: {
			type: DataTypes.ENUM({
				values: ['NotPlayed', 'WhiteWin', 'BlackWin', 'Draw'],
			}),
			allowNull: false,
			defaultValue: 'NotPlayed',
		},
	});


    return Match
};
