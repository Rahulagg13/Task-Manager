const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name must required"],
      minlength: [3, "name should be length of 3 or above"],
      maxlength: [20, "name should be length of 3 or above"],
    },
    email: {
      type: String,
      required: [true, "Email must required"],
      validate: [validator.isEmail, "Email is wrong"],
      lowercase: true,
      unique: [true, "User Already Exist"],
    },
    password: {
      type: String,
      required: [true, "password must required"],
      minlength: [8, "password length should be 8 or above"],
    },
    confirmPassword: {
      type: String,
      required: [true, " Confirm password must required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "The password not equal",
      },
    },
    roles: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpires: {
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  foreignField: "users",
  localField: "_id",
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(changedTimeStamp, JWTTimestamp);
    return JWTTimestamp < changedTimeStamp;
  }
  // False means not changed
  return false;
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log(resetToken, this.passwordResetToken);
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
