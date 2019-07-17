var mongoose = require("mongoose");

// SCHEMA SETUP
var fundSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    goal: Number
});

module.exports = mongoose.model("Fund", fundSchema);