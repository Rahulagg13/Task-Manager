const mongoose = require("mongoose");

async function db(url) {
  await mongoose
    .connect(url)
    .then(() => console.log("DB connect successfully"));
}

module.exports = db;
