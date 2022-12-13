const Sequelize = require('sequelize');

module.exports = class LottoStore extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        region: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        count_win_first: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        count_win_second: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'LottoStore',
        tableName: 'lotto_store',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.PurWinLottoTicket, {
      foreignKey: 'lotto_store_id',
      sourceKey: 'id',
    });
  }
};
