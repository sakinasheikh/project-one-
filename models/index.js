var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/projectOne");

module.exports.User = require("./user");
