const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: false,
        },
        email: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        hashedPassword: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "USER",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      },
    );
  }
};
