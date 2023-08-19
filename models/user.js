const mongoose = require('../db/connection'); 

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,  
    password: String,
    location: String,
    weapon_of_choice: String,
    active: Boolean
});

const User = new mongoose.model('User', UserSchema);

module.exports = User;