const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			user_id: {
				type: Sequelize.STRING(20),
				allowNull: false,
				unique: true
			},
			user_name: {
				type: Sequelize.STRING(50),
				allowNull: true,
				unique: false
			},
			user_age: {
				type: Sequelize.INTEGER,
				allowNull: true,
				unique: false
			},
		},
		{
			sequelize,
			timestamps: false,
			underscored: false,
			modelName: 'User',
			tableName: 'tbl_user',
			paranoid: false,
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci'
		});
	}
};