const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordReminder: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
