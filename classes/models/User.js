// const { default: mongoose } = require("mongoose");
require('dotenv').config();
const process = require('process');
const rootDir = process.cwd();
const connectDB = require(rootDir + "/classes/helpers/connectDB.js");

const mongoose = connectDB.mongoose;
const userSchema = new mongoose.Schema({
    username: String,
});
const User = mongoose.model(process.env.MONGODB_COLLECTION_USER, userSchema);

module.exports = { User };

