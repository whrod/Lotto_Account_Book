const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

router.use('/', userRouter);
router.use('/auth', authRouter);

module.exports = router;
