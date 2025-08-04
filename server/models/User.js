const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  number: { type: String, required: true},
age: { type: Number, required: true},

  image: String,
});

module.exports = mongoose.model('User', userSchema);
