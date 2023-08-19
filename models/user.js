const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    location: String,
    weapon: String,
    active: Boolean
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
