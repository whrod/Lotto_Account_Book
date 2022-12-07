const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

const routes = require('./routes');
const { globalErrorHandler } = require('./utils/error');
const { sequelize } = require('./models');

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //true : qs / false : querystring
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie', // name dafault : 'connect.sid'
  })
);
app.use('/', (req, res, next) => {
  if (req.session.id) {
    express.static(__dirname, 'public')(req, res, next);
  } else {
    next();
  }
});
/* 미들웨어 확장
cookie와 session 뒤에 있을 때 로그인한 유저에게만 스태틱을 작동하게 할때
위처럼 조건문과 next()로 미들웨어를 확장할 수 있다.
*/

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

// sequelize.sync({ force: false }).then(() => {
//   console.log('database connection success');
// });.
