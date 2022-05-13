// const mongoose = require("mongoose");
// const config = require("../config");
// const { mongoUrl } = config;
// // const connectDB = mongoose.
// const connectDB = async () => {
//   try {
//     await mongoose.connect(mongoUrl);
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = connectDB;
const mongoose = require("mongoose");
const config = require("../config");
const { mongoUrl } = config;
const connect = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("mongo db connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connect;
