const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
// const path = require('path');

dotenv.config();
const routes = require('./routes');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig();

const { globalErrorHandler } = require('./utils/error');

app.set('port', process.env.PORT || 8000);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

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
app.use(passport.initialize());
app.use(passport.session());
// app.use('/', (req, res, next) => {
//   if (req.session.id) {
//     express.static(__dirname, 'public')(req, res, next);
//   } else {
//     next();
//   }
// });
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

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//   });
