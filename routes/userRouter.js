const userRouter = require('express').Router();

const { userController } = require('../controllers');

userRouter.get('/', userController.connectTest);

module.exports = userRouter;
