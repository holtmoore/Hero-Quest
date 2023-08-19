//models/quest.js
const mongoose = require('../db/connection');
const QuestSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
      },
      difficulty: {
        type: String,
        required: true,
      }
    });

const Quest = mongoose.model('Quest', QuestSchema);
module.exports = Quest;
