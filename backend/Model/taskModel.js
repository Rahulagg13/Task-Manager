const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require("./userModel");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title Field is Empty"],
      minlength: [3, "title length should be 3 or above "],
      maxlength: [30, "title length should be 30 or below "],
    },
    description: {
      type: String,
      required: [true, "there should be description"],
      trim: true,
    },
    dueDate: {
      type: Date,
      default: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    slug: String,
    users: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "userid missing"],
    },
  },
  { timestamps: true }
);

// taskSchema.pre(/^find/, function (next) {
//   this.populate("users", "-task -password");
//   next();
// });

taskSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
