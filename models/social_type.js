const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'SocialType',
        tableName: 'social_type',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.SocialType.hasMany(db.User, {
      foreignKey: 'social_type_id',
      sourceKey: 'id',
    });
  }
};
