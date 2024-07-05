const mongoose = require("mongoose");
const DB_NAME = process.env.DB_NAME;

mongoose.Promise = global.Promise;

module.exports = mongoose
  .connect(`mongodb://127.0.0.1/${DB_NAME}`)
  .then((db) => {
    console.log(db.connection.name);
    console.log("Successfully connected to database.");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
