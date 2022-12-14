'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];

//FIXME: 코드 줄이기
const User = require('./user');
// const SocialType = require('./social_type');
const PurLottoTicket = require('./purchased_lotto_ticket');
const PurWinLottoTicket = require('./pur_win_lotto_ticket');
const WinLottoTicket = require('./winning_lotto_ticket');
const LottoStore = require('./lotto_store');

// const basename = path.basename(__filename);

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//FIXME: 코드 줄이기
db.User = User;
// db.SocialType = SocialType;
db.PurLottoTicket = PurLottoTicket;
db.PurWinLottoTicket = PurWinLottoTicket;
db.WinLottoTicket = WinLottoTicket;
db.LottoStore = LottoStore;

User.init(sequelize);
// SocialType.init(sequelize);
PurLottoTicket.init(sequelize);
PurWinLottoTicket.init(sequelize);
WinLottoTicket.init(sequelize);
LottoStore.init(sequelize);

User.associate(db);
// SocialType.associate(db);
PurLottoTicket.associate(db);
PurWinLottoTicket.associate(db);
WinLottoTicket.associate(db);
LottoStore.associate(db);

module.exports = db;
