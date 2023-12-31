//models/user.js
const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    location: String,
    weapon: String,
    active: Boolean,
    active_quest: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
    questCompleted: { type: Boolean, default: false },
    image: String

});


const User = mongoose.model('User', UserSchema);

module.exports = User;
