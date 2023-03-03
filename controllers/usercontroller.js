const AppError = require('../utils/appError');
const User = require('./../model/usermodel');
const catchAsync = require('./../utils/catchAsync');

exports.getallUser = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(500).json({
    status: 'sucess',
    data: {
      users,
      message: 'Done',
    },
  });
});
exports.createnewuser = (req, res) => {
  res.status(500).json({
    status: 'sucess',
    data: {
      message: 'Done',
    },
  });
};
exports.getuserById = (req, res) => {
  res.status(500).json({
    status: 'sucess',
    data: {
      message: 'Done',
    },
  });
};
exports.updateuserById = (req, res) => {
  res.status(500).json({
    status: 'sucess',
    data: {
      message: 'Done',
    },
  });
};
exports.deleteuserById = (req, res) => {
  res.status(500).json({
    status: 'sucess',
    data: {
      message: 'Done',
    },
  });
};
