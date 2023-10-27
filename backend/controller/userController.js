const User = require("../Model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const users = await User.findById({ _id: req.user._id }).populate(
    "tasks",
    "-password"
  );
  if (!users) {
    next(new AppError("you are not logged in", 401));
  }
  res.status(200).json({
    status: "success",
    data: {
      users,
      task: users.tasks,
    },
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
      length: users.length,
    },
  });
});

exports.deactivateUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {
    isActive: false,
  });
  await User.save();
  res.status(200).json({
    status: "success",
    message: "current is deactivated",
  });
});

exports.deactivateAnyUser = catchAsync(async (req, res, next) => {
  // console.log(req.params);
  const users = await User.findByIdAndUpdate(req.params.id, {
    isActive: false,
  });
  await users.save({ validateBeforeSave: false });
  if (!users) next(new AppError("User Already deactivate ", 404));
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
