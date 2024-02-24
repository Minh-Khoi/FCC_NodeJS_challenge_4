require('dotenv').config();
const mongoose = require('mongoose');

let connectionStr = process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASS)
                                            .replace('<my_specific_database>', process.env.MONGODB_DB)

mongoose.connect(connectionStr);

module.exports = { mongoose };