const { default: mongoose } = require("mongoose");
require('dotenv').config();
const process = require('process');
const rootDir = process.cwd();
const connectDB = require(rootDir + "/classes/helpers/connectDB.js");
// const mongoose = connectDB.mongoose;

const exerciseSchema = new mongoose.Schema({
    username: String,
    description: String,
    duration: Number,
    date: Date
});
const Exercise = mongoose.model(process.env.MONGODB_COLLECTION_EXERCISE, exerciseSchema);

module.exports = { Exercise };