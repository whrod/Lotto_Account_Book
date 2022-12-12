const Sequelize = require('sequelize');

//Todo
module.exports = class WinLottoTicket extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        win_no_first: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        win_no_second: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        win_no_third: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        win_no_fourth: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        win_no_fifth: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        win_no_sixth: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        win_no_bonus: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        win_round: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        first_prize_amount: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        second_prize_amount: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        third_prize_amount: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'WinLottoTicket',
        tableName: 'winning_lotto_ticket',
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
    db.WinLottoTicket.hasMany(db.PurWinLottoTicket, {
      foreignKey: 'winning_lotto_ticket_id',
      sourceKey: 'id',
    });
  }
};
