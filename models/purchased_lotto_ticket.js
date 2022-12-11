const Sequelize = require('sequelize');

module.exports = class PurLottoTicket extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        pur_no_frst: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_no_frst: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_no_frst: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_no_frst: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
  //social_type
  static associate(db) {
    db.User.belongsTo(db.SocialType, {
      foreignKey: 'social_type_id',
      targetKey: 'id',
    });
  }
};
