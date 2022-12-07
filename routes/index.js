const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');

router.use('/main', (req, res) => {
  return res.status(201).json('Hello');
});

module.exports = router;
