const app = require("./app");
// const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handle uncought exceptions (such as if you log a here but a is not defined)
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down server due to uncought exception");
  process.exit(1);
});

// Setting up config file
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").dotenv.config({ path: "backend/config/config.env" });
}

//Setting up database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server listening on port : ${process.env.PORT} in environment : ${process.env.NODE_ENV}`
  );
});

// Handle unhandledPromiseRejection (such as wrong mongodb connection string)
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
