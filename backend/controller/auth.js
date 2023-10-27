const jwt = require("jsonwebtoken");
const { promisify } = require("node:util");
const User = require("../Model/userModel");
const sendMail = require("../utils/mailController");
const crypto = require("crypto");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

/////////////////////////////////////////////////////////////////////////////////////
// const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// const findUser = async (email) => {
//   const json = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));

//   return json.find((ele) => ele.email === email);
// };

// const checkUserExist = async (email) => {
//   const json = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));

//   return json.find((ele) => ele.email === email);
// };
/////////////////////////////////////////////////////////////////////////////////////

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const createToken = (user, statusCode, res) => {
  console.log(user);
  const token = signToken(user._id);
  // const cookieOptions = {
  //   httpOnly: true,
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  // };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  // res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.Authorization = async (req, res, next) => {
  try {
    let token;
    const auth = req.headers.authorization;
    console.log(req.headers);
    if (auth && auth.startsWith("Bearer")) {
      token = auth.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) return next(new AppError("you are not logged in", 401));

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) next(new AppError("Account of this user deleted", 404));
    req.user = freshUser;
    res.locals.user = freshUser;
    next();
  } catch (err) {
    next();
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  createToken(newUser, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password)
    return next(new AppError("Please provide email and password", 500));

  const user = await User.findOne({ email });
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect Email or password", 500));

  createToken(user, 200, res);
});

// exports.isLoggedIn = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );
//       const freshUser = await User.findById(decoded.id);
//       if (!freshUser) {
//         return next();
//       }
//       //4) check if user changed password after the token was issued
//       if (freshUser.changedPasswordAfter(decoded.iat)) {
//         next();
//       }
//       req.user = freshUser;
//       return next();
//     } catch (err) {
//       return next();
//     }
//   }
//   next();
// };

exports.signout = catchAsync(async (req, res) => {
  if (!req.cookies.jwt) return next(new AppError("You already logout", 500));
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

exports.restrictTo = (roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.roles))
        return next(new AppError("You are not authorized", 401));
      next();
    } catch (err) {
      next();
    }
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with mail ", 404));
  }
  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `We have received a reset password Request. Please click the below link\n\n ${resetUrl} to reset your Password.\n\n This link is valid only 10 min`;
  const html = `<p>We have received a reset password Request. Please click the below link\n\n ${resetUrl} to reset your Password.\n\n This link is valid only 10 min</p>`;
  const mailInfo = {
    receiver: user.email,
    subject: "Reset Password Request",
    text: message,
    html,
  };
  try {
    await sendMail(mailInfo);
    res.status(200).json({
      status: "Success",
      message: "You email has been send",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending the email ,try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Your token is invalid", 500));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save({ validateBeforeSave: false });

  createToken(user, 200, res);
});
