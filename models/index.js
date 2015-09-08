var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/projectOne");
var userModel = require("./user");
module.exports.User = userModel.User;
module.exports.Idea = userModel.Idea;
