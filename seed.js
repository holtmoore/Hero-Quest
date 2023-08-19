const mongoose = require('mongoose');
const Quest = require('./models/quest');

const sampleQuests = [
  {
    id: 1,
    location: "Dungeon of Doom",
    possible_enemies: ["Skeletons", "Zombies", "Orcs"],
    reward: "Golden Sword",
    difficulty_level: "Hard"
  },
  // Add more sample quests here
];

// Connect to the MongoDB server
mongoose.connect('mongodb://localhost/heroquest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Seed the sample quests into the database
Quest.insertMany(sampleQuests, (err, docs) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Sample quests seeded successfully:', docs);
  }
  mongoose.connection.close();
});
