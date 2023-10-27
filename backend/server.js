process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("shutting down...");
  process.exit(1);
});

require("dotenv").config({ path: "./config.env" });
const app = require("./index");
const db = require("./db");

const PORT = process.env.PORT || 5000;
db(process.env.DATABASE_URL);
app.listen(PORT, () => {
  console.log(`App is Running on ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
