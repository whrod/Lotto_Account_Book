require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');

const routes = require('./routes');
const { globalErrorHandler } = require('./utils/error');

const app = express();

// sequelize.sync({ force: false }).then(() => {
//   console.log('database connection success');
// });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.all('*', (req, res, next) => {
  const error = new Error(`Can't fine ${req.originalUrl} on this server!`);
  error.statusCode = 404;

  next(error);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening to request on 127.0.0.1:${PORT}`);
});
