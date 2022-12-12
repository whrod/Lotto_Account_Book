const Sequelize = require('sequelize');

module.exports = class PurWinLottoTicket extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        winning_amount: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'PurWinLottoTicket',
        tableName: 'pur_win_lotto_ticket',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  /*TODO
  관계연결 : winning_lotto_ticket_id
  */
  static associate(db) {
    db.PurWinLottoTicket.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    db.PurWinLottoTicket.belongsTo(db.PurLottoTicket, {
      foreignKey: 'purchased_lotto_ticket_id',
      targetKey: 'id',
    });
    db.PurWinLottoTicket.belongsTo(db.WinLottoTicket, {
      foreignKey: 'winning_lotto_ticket_id',
      targetKey: 'id',
    });
  }
};
