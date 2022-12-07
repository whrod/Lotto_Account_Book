require('dotenv').config();
const env = process.env;

const development = {
  username: env.SEQUELIZE_USERNAME,
  password: env.SEQUELIZE_PASSWORD,
  database: env.SEQUELIZE_DEV_DATABASE,
  host: env.SEQUELIZE_HOST,
  dialect: env.SEQUELIZE_DIALECT,
  port: env.SEQUELIZE_PORT,
};

const production = {
  username: env.SEQUELIZE_USERNAME,
  password: env.SEQUELIZE_PROD_DB_PASSWORD,
  database: env.SEQUELIZE_PROD_DATABASE,
  host: env.SEQUELIZE_HOST,
  dialect: env.SEQUELIZE_DIALECT,
  //port: env.MYSQL_PORT
};

const test = {
  username: env.SEQUELIZE_USERNAME,
  password: env.SEQUELIZE_TEST_DB_PASSWORD,
  database: env.SEQUELIZE_TEST_DATABASE,
  host: env.SEQUELIZE_HOST,
  dialect: env.SEQUELIZE_DIALECT,
  //port: env.MYSQL_PORT
};
// console.log(development.username);
// console.log(development.password);
// console.log(development.database);
// console.log(development.host);
// console.log(development.dialect);

module.exports = { development, production, test };
