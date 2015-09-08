// require dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

// create user schema
var ImageSchema = new Schema({
  image: {
  	type: String, 
  	required: true
  },
});

// define user model
var Imag = mongoose.model('Imag', ImageSchema);

// export user model
module.exports = Imag;