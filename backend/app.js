const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const os = require("os");
const taskRouter = require("./routes/taskRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const AppError = require("./utils/AppError");
const globalErrorhandler = require("./controller/errorController");
const errorController = require("./controller/errorController");

const app = express();
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use(express.json());

app.use(cookieParser());
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(errorController);
// console.log(os.cpus().length);

module.exports = app;
