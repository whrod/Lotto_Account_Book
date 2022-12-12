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
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        social_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          unique: true,
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
    db.User.belongsTo(db.SocialType, {
      foreignKey: 'social_type_id',
      targetKey: 'id',
    });
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
