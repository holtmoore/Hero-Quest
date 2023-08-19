const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  id: Number,
  location: String,
  possible_enemies: [String],
  reward: String,
  difficulty_level: String
});

const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;
