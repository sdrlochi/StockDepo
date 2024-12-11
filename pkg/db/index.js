const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../config/config.env` });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

exports.init = async () => {
  try{
    await mongoose.connect(DB);
    console.log("Successfully connected to the DATABASE");
  }catch (err) {
    console.log(err);
  }
};