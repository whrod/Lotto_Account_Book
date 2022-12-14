const { userService } = require('../services');
const { catchAsync } = require('../utils/error');

const connectTest = catchAsync(async (req, res) => {
  return res.status(201).json('Hello');
});

module.exports = {
  connectTest,
};
