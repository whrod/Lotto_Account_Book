const authRouter = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewears');
const User = require('../models/user');

const { authController } = require('../controllers');

const { catchAsync } = require('../utils/error');

authRouter.post(
  '/signup',
  isNotLoggedIn,
  catchAsync(async (req, res) => {
    const { email, nick, password, age } = req.body;
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/signup?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
      age,
    });
    return res.redirect('/');
  })
);

authRouter.post('/signin', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?signin=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

authRouter.get('/logout', isLoggedIn, (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

authRouter.get('/kakao', passport.authenticate('kakao'));

authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = authRouter;
