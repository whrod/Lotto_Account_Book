const Sequelize = require('sequelize');
const { SELECT } = require('sequelize/types/query-types');

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
        second_prize_amount: {},
        third_prize_amount: {},
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'winLottoTicket',
        tableName: 'winchased_lotto_ticket',
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
    db.winLottoTicket.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    db.winLottoTicket.hasMany(db.winWinLottoTicket, {
      foreignKey: 'winchased_lotto_ticket_id',
      sourceKey: 'id',
    });
  }
};
