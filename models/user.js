const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        social_id: {
          type: Sequelize.BIGINT,
          allowNull: true,
          unique: true,
        },
        provider: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'User',
        tableName: 'user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  //TODO 관계 연결
  static associate(db) {
    db.User.hasMany(db.PurLottoTicket, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    });
    db.User.hasMany(db.PurWinLottoTicket, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    });
  }
};
