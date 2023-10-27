const Task = require("../Model/taskModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAlltask = catchAsync(async (req, res, next) => {
  console.log(req.user);
  console.log(req.user._id);
  const tasks = await Task.find({ users: req.user._id });
  console.log(tasks);

  res.status(200).json({
    status: "success",
    tasks,
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  // const value = JSON.parse(await fs.readFile("./data/tasks.json", "utf-8"));
  // const task = value.find((ele) => ele.id === id);
  const task = await Task.findById(id);
  if (!task) next(new AppError("No task Found", 404));

  res.status(200).json({
    status: "success",
    task,
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    users: req.user._id,
  });

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    task,
  });
});
exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    task,
  });
});
