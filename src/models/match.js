const { Sequelize, DataTypes } = require('sequelize');
const Tournament = require('./tournament');
const User = require('./user');

/**
 *
 * @param {Sequelize} sequelize
 */
module.exports = (sequelize) => {
	const MatchResult = sequelize.define('matchResult', {
		// tournamentId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
        //     references:{
        //         model:Tournament,
        //         key:'id'
        //     }
		// },
		// playerWhiteId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
        //     references:{
        //         model:User,
        //         key:'id'
        //     }
		// },
		// playerBlackId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
        //     references:{
        //         model:User,
        //         key:'id'
        //     }
		// },
		result: {
			type: DataTypes.ENUM({
				values: ['NotPlayed', 'WhiteWin', 'BlackWin', 'Draw'],
			}),
			allowNull: false,
			defaultValue: 'NotPlayed',
		},
	});


    return MatchResult
};
