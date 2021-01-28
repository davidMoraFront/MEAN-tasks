// This file will handle connection logic to the MongoDB database

const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/TaskManager";

mongoose.Promise = global.Promise;
mongoose
  .connect(uri, { userNewUrlParser: true, useUnifiedTopology: true })
  //   .connect("mongodb://localhost:27017/TaskManager")
  .then(() => {
    console.log("Connected to MongoDB successfully :)");
  })
  .catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
  });

// To prevent deprectation warnings (from MongoDB native driver)
// mongoose.set("userCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = { mongoose };
