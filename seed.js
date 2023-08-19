const mongoose = require('./db/connection');
const Quest = require('./models/quest');

mongoose.connect('mongodb+srv://doueven1996:KfcqJfHC0uVIG9bZ@herocluster.ivt3edt.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quests = [
  { description: 'Go outside and capture 3 squirrels.', difficulty: 'easy' },
  { description: 'Find a hidden treasure in your backyard.', difficulty: 'medium' },
  { description: 'Defeat the dragon that lives in the park.', difficulty: 'hard' },
  // Add more quest objects here
];

Quest.insertMany(quests)
  .then(() => {
    console.log('Quests inserted');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting quests:', err);
  });
