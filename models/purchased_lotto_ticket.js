const Sequelize = require('sequelize');

module.exports = class PurLottoTicket extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        pur_no_first: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_no_second: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_no_third: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_no_fourth: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_no_fifth: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_no_sixth: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        pur_round: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'PurLottoTicket',
        tableName: 'purchased_lotto_ticket',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  /*TODO
  관계연결 : winning_lotto_ticket, lotto_store)
  */
  static associate(db) {
    db.PurLottoTicket.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    db.PurLottoTicket.hasMany(db.PurWinLottoTicket, {
      foreignKey: 'purchased_lotto_ticket_id',
      sourceKey: 'id',
    });
    db.PurLottoTicket.belongsTo(db.WinLottoTicket, {
      foreignKey: 'winning_lotto_ticket_id',
      targetKey: 'id',
    });
    db.PurLottoTicket.belongsTo(db.LottoStore, {
      foreignKey: 'lotto_store_id',
      targetKey: 'id',
    });
  }
};
